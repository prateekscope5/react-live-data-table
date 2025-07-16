import React, { useEffect, useState, useCallback } from 'react';
import "./index.css";

function ReactDataTable({
  dataSource,
  columns,
  loading = false,
  maxHeight = "600px",
  height = "600px",
  showCheckbox = false,
  onSelectionChange,
  defaultLimit = 50,
  onRowClick,
  livePagination = false,
  staticData = null,
  emptyText,
  rowHeights = 40,
  headerProps = {},
  selected = {},
  showSelectAllCheckbox = true,
  rowStyle = {},
  rowClassName = "",
  columnReorder = false,
}) {
  const tableContainerRef = React.useRef(null);
  const [data, setData] = React.useState({ pages: [], meta: { totalPages: 1 } });
  const [isFetching, setIsFetching] = React.useState(false);
  const [pageParam, setPageParam] = React.useState(1);
  const [selectedRows, setSelectedRows] = React.useState(selected);
  const previousSelected = React.useRef(selected);
  const [resizingIndex, setResizingIndex] = useState(null);
  const [columnWidths, setColumnWidths] = useState([]);
  const [startX, setStartX] = useState(null);
  const [initialWidth, setInitialWidth] = useState(null);
  const [tableWidth, setTableWidth] = useState(0);
  
  // Column reordering state - only used when columnReorder is true
  const [orderedColumns, setOrderedColumns] = useState(columns);
  const [draggedColumn, setDraggedColumn] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  
  // Ref to store column widths to ensure persistence during data loading
  const persistedColumnWidthsRef = React.useRef([]);

  const flatData = data.pages.flatMap(page => page.data);

  const checkboxColumn = {
    id: 'select',
    size: 50,
    minWidth: 50,
    resizable: false,
    reorderable: false, // Prevent checkbox column from being reordered
    textAlign: "center",
    header: ({ data }) => {
      const allSelected = flatData.length > 0 && flatData.every(row => selectedRows[row.id]);
      const someSelected = flatData.some(row => selectedRows[row.id]) && !allSelected;

      return (
        <div className="flex items-center justify-center h-[40px]">
          {showSelectAllCheckbox && (
            <div className="relative">
              <input
                id={data.id}
                type="checkbox"
                className='bg-gray-700 rounded-4 border-gray-200 text-blue-400 focus:ring-0 focus:ring-white'
                checked={allSelected}
                onChange={(e) => handleSelectAll(e.target.checked, flatData)}
              />
              {allSelected ? (
                <svg
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                someSelected &&
                <svg
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none "
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          )}
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center h-[40px]" onClick={(e) => e.stopPropagation()}>
          <input
            id={row.id}
            type="checkbox"
            className='bg-gray-700 rounded-4 border-gray-200 text-blue-400 focus:ring-0 focus:ring-white'
            checked={!!selectedRows[row.id]}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => { e.stopPropagation(); handleSelectRow(e.target.checked, row, flatData) }}
          />
        </div>
      )
    }
  };

  const enhancedColumns = showCheckbox ? [checkboxColumn, ...orderedColumns] : orderedColumns;

  // Update ordered columns when columns prop changes
  useEffect(() => {
    setOrderedColumns(columns);
  }, [columns]);

  useEffect(() => {
    if (JSON.stringify(previousSelected.current) !== JSON.stringify(selected)) {
      setSelectedRows({ ...selected });
      previousSelected.current = selected;
    }
  }, [selected]);

  // Initialize column widths array only once when component mounts or columns change
  useEffect(() => {
    const allColumns = showCheckbox ? [{ id: 'select', size: 50 }, ...orderedColumns] : orderedColumns;

    // If we have persisted widths and the number of columns matches, use those
    if (persistedColumnWidthsRef.current.length === allColumns.length) {
      setColumnWidths([...persistedColumnWidthsRef.current]);
      setTableWidth(persistedColumnWidthsRef.current.reduce((sum, width) => sum + width, 0));
    } else {
      // Otherwise initialize with default widths
      const initialWidths = allColumns.map(column => column.size || column.minWidth || 150);
      setColumnWidths(initialWidths);
      setTableWidth(initialWidths.reduce((sum, width) => sum + width, 0));
      // Store in our ref for persistence
      persistedColumnWidthsRef.current = [...initialWidths];
    }
  }, [orderedColumns, showCheckbox]);

  useEffect(() => {
    setData({ pages: [], meta: { totalPages: 1 } });
    setPageParam(1);

    if (staticData) {
      setData({
        pages: [{
          data: staticData,
          meta: {
            totalPages: 1,
            totalCount: staticData.length
          }
        }],
        meta: {
          totalPages: 1,
          totalCount: staticData.length
        }
      });
    } else {
      loadInitialData();
    }
  }, [dataSource, staticData]);

  // Column reordering handlers - only work when columnReorder is true
  const handleDragStart = (e, columnIndex) => {
    if (!columnReorder || enhancedColumns[columnIndex].reorderable === false) {
      e.preventDefault();
      return;
    }
    setDraggedColumn(columnIndex);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, columnIndex) => {
    e.preventDefault();
    if (!columnReorder || enhancedColumns[columnIndex].reorderable === false) return;
    setDragOverColumn(columnIndex);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (!columnReorder || draggedColumn === null || draggedColumn === dropIndex) {
      setDraggedColumn(null);
      setDragOverColumn(null);
      return;
    }

    if (enhancedColumns[dropIndex].reorderable === false) {
      setDraggedColumn(null);
      setDragOverColumn(null);
      return;
    }

    const newColumns = [...enhancedColumns];
    const draggedColumnData = newColumns[draggedColumn];
    
    newColumns.splice(draggedColumn, 1);
    const adjustedDropIndex = draggedColumn < dropIndex ? dropIndex - 1 : dropIndex;
    newColumns.splice(adjustedDropIndex, 0, draggedColumnData);

    const updatedOrderedColumns = showCheckbox ? newColumns.slice(1) : newColumns;
    setOrderedColumns(updatedOrderedColumns);

    // Reorder column widths
    const newColumnWidths = [...columnWidths];
    const draggedWidth = newColumnWidths[draggedColumn];
    newColumnWidths.splice(draggedColumn, 1);
    newColumnWidths.splice(adjustedDropIndex, 0, draggedWidth);
    setColumnWidths(newColumnWidths);
    persistedColumnWidthsRef.current = newColumnWidths;

    // onColumnReorder?.(updatedOrderedColumns);

    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleMouseMove = useCallback((e) => {
    if (resizingIndex === null || startX === null || initialWidth === null) return;

    const delta = e.clientX - startX;
    const newWidth = Math.max(enhancedColumns[resizingIndex]?.minWidth || 80, initialWidth + delta);

    // Create a new array of column widths with the updated width
    const newColumnWidths = [...columnWidths];
    newColumnWidths[resizingIndex] = newWidth;

    // Update the column widths state
    setColumnWidths(newColumnWidths);

    // Update our persisted ref to maintain widths during pagination
    persistedColumnWidthsRef.current = newColumnWidths;

    // Recalculate table width based on the new column widths
    const newTableWidth = newColumnWidths.reduce((sum, width) => sum + width, 0);
    setTableWidth(newTableWidth);
  }, [resizingIndex, startX, initialWidth, enhancedColumns, columnWidths]);

  const handleMouseUp = useCallback(() => {
    setResizingIndex(null);
    setStartX(null);
    setInitialWidth(null);
  }, []);

  // Add resize event listeners
  useEffect(() => {
    if (resizingIndex !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [resizingIndex, handleMouseMove, handleMouseUp]);

  const handleResizeStart = (e, index) => {
    const column = enhancedColumns[index];
    if (!column.resizable) return;

    e.preventDefault();
    e.stopPropagation();

    setResizingIndex(index);
    setStartX(e.clientX);
    setInitialWidth(columnWidths[index] || column.size || column.minWidth || 150);
  };

  const loadInitialData = async () => {
    if (!dataSource) return;

    try {
      const initialData = await dataSource({ skip: 0, limit: defaultLimit });
      setData({
        pages: [initialData],
        meta: initialData.meta
      });
      setPageParam(1);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const fetchNextPage = async () => {
    if (isFetching || !livePagination || staticData) return;

    setIsFetching(true);
    try {
      const nextData = await dataSource({
        skip: pageParam * defaultLimit,
        limit: defaultLimit
      });

      // Update the data but maintain our column widths
      setData(prev => ({
        pages: [...prev.pages, nextData],
        meta: nextData.meta
      }));

      setPageParam(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching next page:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSelectAll = (checked, flatData) => {
    if (checked) {
      const newSelected = {};
      flatData.forEach(row => {
        newSelected[row.id] = { ...row };
      });
      setSelectedRows(newSelected);
      onSelectionChange?.({
        data: flatData,
        selected: true,
        originalData: flatData,
        unselected: null
      });
    } else {
      setSelectedRows({});
      onSelectionChange?.({
        data: [],
        selected: {},
        originalData: data.pages.data
      });
    }
  };

  const handleSelectRow = (checked, row, flatData) => {
    const rowId = row.id;
    if (checked) {
      setSelectedRows(prev => ({
        ...prev,
        [rowId]: { ...row }
      }));
      onSelectionChange?.({
        data: { ...row },
        selected: { ...selectedRows, [rowId]: { ...row } },
        [rowId]: { ...row },
        originalData: [...flatData]
      });
    } else {
      const updatedSelectedRows = { ...selectedRows };
      delete updatedSelectedRows[rowId];

      setSelectedRows(updatedSelectedRows);
      onSelectionChange?.({
        data: { ...row },
        selected: { ...updatedSelectedRows },
        originalData: [...flatData]
      });
    }
  };

  const handleRowClick = (row, index, flatData) => {
    onRowClick?.({
      data: { ...row },
      dataSourceArray: flatData,
      rowIndex: index
    });
  };

  const handleScroll = (containerRefElement) => {
    if (containerRefElement) {
      const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
      if (
        scrollHeight - scrollTop - clientHeight < 500 &&
        !isFetching &&
        pageParam < data.meta.totalPages
      ) {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    handleScroll(tableContainerRef.current);
  }, [data]);

  return (
    <div className="bg-white relative w-full react-live-data-table" >
      {loading && (
        <div className="absolute inset-0 bg-white/50 z-20 flex items-center justify-center">
          <svg
            style={{
              animation: 'spin 1s linear infinite',
              width: '24px',
              height: '24px'
            }}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <style>
              {`@keyframes spin {from {transform: rotate(0deg)} to {transform: rotate(360deg)}}`}
            </style>
            <circle
              style={{ opacity: 0.25 }}
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              style={{ opacity: 0.75 }}
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}

      {
        flatData.length === 0 && !loading ? (
          <div className="flex items-center justify-center" style={{ height }}>
            <div className="text-gray-500">
              {emptyText || 'No data available'}
            </div>
          </div>
        ) : (
          <div className="overflow-hidden">
            <div
              ref={tableContainerRef}
              className="overflow-auto w-full"
              style={{ maxHeight, height }}
              onScroll={(e) => handleScroll(e.currentTarget)}
            >
              <table
                className="w-full border-collapse"
                style={{
                  tableLayout: 'fixed',
                }}
              >
                <thead
                  className="sticky top-0 z-10 bg-blue-300"
                  style={{ ...headerProps.style }}
                >
                  <tr className='react-live-data-table-row-header'>
                    {enhancedColumns.map((column, columnIndex) => {
                      const width = columnWidths[columnIndex] || column.size || column.minWidth || 150;
                      const isReorderable = columnReorder && column.reorderable !== false;
                      const isDropTarget = dragOverColumn === columnIndex && draggedColumn !== columnIndex;

                      return (
                        <th
                          key={column.accessorKey || column.id}
                          className={`text-left font-normal h-[40px] border-b border-t border-solid border-[#e4e3e2] relative select-none ${
                            columnIndex < enhancedColumns.length - 1 ? 'border-r' : ''
                          } ${isReorderable ? 'cursor-move' : ''} ${
                            isDropTarget ? 'bg-blue-400' : ''
                          }`}
                          style={{
                            width: `${width}px`,
                            minWidth: `${width}px`,
                            maxWidth: `${width}px`,
                            textAlign: column.textAlign,
                          }}
                          draggable={isReorderable}
                          onDragStart={(e) => handleDragStart(e, columnIndex)}
                          onDragOver={(e) => handleDragOver(e, columnIndex)}
                          onDrop={(e) => handleDrop(e, columnIndex)}
                        >
                          <div className="flex items-center h-full overflow-hidden justify-center pl-[17px]">
                            <span className="truncate">
                              {typeof column.header === 'function' ? column.header({ data: flatData }) : column.header}
                            </span>
                          </div>

                          {/* Resize handle - Only show if column is resizable */}
                          {column.resizable !== false && (
                            <div
                              className={`absolute top-0 right-0 h-full w-4 flex items-center justify-center group ${
                                resizingIndex === columnIndex ? 'bg-blue-100' : 'hover:bg-blue-100'
                              } transition-colors duration-200`}
                              onMouseDown={(e) => handleResizeStart(e, columnIndex)}
                              style={{
                                touchAction: 'none',
                                userSelect: 'none',
                                cursor: 'col-resize'
                              }}
                            >
                            </div>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {flatData.length > 0 ? (
                    flatData.map((row, rowIndex) => {
                      const isLastRow = rowIndex === flatData.length - 1;
                      return (
                        <tr
                          key={row.id}
                          className={`react-live-data-table-row-${index} border-t ${isLastRow ? 'border-b' : ''} border-gray-200 hover:bg-[#dee1f2] ${selectedRows[row.id] ? 'bg-[#dee1f2]' : ''} ${rowClassName} cursor-pointer`}
                          style={{
                            height: `${rowHeights}px`,
                            ...rowStyle,
                            ...(typeof rowStyle === 'function' ? rowStyle(row, rowIndex) : {})
                          }}
                          onClick={() => handleRowClick(row, rowIndex, flatData)}
                        >
                          {enhancedColumns.map((column, columnIndex) => {
                            const width = columnWidths[columnIndex] || column.size || column.minWidth || 150;

                            return (
                              <td
                                key={column.accessorKey || column.id}
                                className={`text-left font-normal ${columnIndex < enhancedColumns.length - 1 ? 'border-r' : ''
                                  } ${column?.cellProps?.className || ''}`}
                                style={{
                                  width: `${width}px`,
                                  minWidth: `${width}px`,
                                  maxWidth: `${width}px`,
                                  textAlign: column?.textAlign,
                                  ...column?.cellProps?.style,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {typeof column.cell === 'function' ? column.cell({ row }) : null}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={enhancedColumns.length} className="text-center py-4">
                        {emptyText || 'No data available'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )
      }

      {/* Resize overlay */}
      {resizingIndex !== null && (
        <div
          className="fixed inset-0 z-40 bg-blue-50/5"
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            cursor: 'col-resize'
          }}
        />
      )}
    </div>
  );
}

export default ReactDataTable;
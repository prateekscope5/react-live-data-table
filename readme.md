# React Data Grid Table

A highly customizable and efficient data grid table for React. It supports features like **live pagination**, **checkbox selection**, **dynamic data loading**, **scrollable body**, and more. This component is designed to make handling tabular data easier and more interactive.

---

## 🚀 Installation

To install the package, run one of the following commands:

bash
npm install react-data-grid-table

# React Data Grid

A flexible React data grid component with support for pagination, row selection, and dynamic data handling.

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `dataSource` | `Array \| Function` | The data to display in the grid. Can be an array for static data or a function for server-side pagination |
| `columns` | `Array` | Defines the columns configuration |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | `false` | Shows loading state |
| `maxHeight` | `string` | `"600px"` | Maximum height of the grid |
| `height` | `string` | `"600px"` | Fixed height of the grid |
| `showCheckbox` | `boolean` | `false` | Enable row selection |
| `onSelectionChange` | `Function` | - | Callback when row selection changes |
| `defaultLimit` | `number` | `50` | Rows per page |
| `onRowClick` | `Function` | - | Callback when row is clicked |
| `livePagination` | `boolean` | `false` | Enable server-side pagination |
| `staticData` | `Array` | `null` | Static data array |
| `emptyText` | `string` | - | Text shown when no data |
| `rowHeights` | `number` | `40` | Height of each row |
| `headerProps` | `object` | `{}` | Custom header properties |

## Basic Usage

import React, { useCallback } from 'react';

const paginationRowsPerPageOptions = [10, 15, 20, 25, 30];

const getNumberOfPages = (rowCount: number, rowsPerPage: number) => Math.ceil(rowCount / rowsPerPage);

const Pagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage,
  currentPage,
}: {
    rowsPerPage: number,
    rowCount: number,
    onChangePage: (page: number) => void,
    onChangeRowsPerPage: (perPage: number, curPage: number) => void,
    currentPage: number,
  }) => {
  const numPages = getNumberOfPages(rowCount, rowsPerPage);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = (lastIndex - rowsPerPage) + 1;
  const disabledLesser = currentPage === 1;
  const disabledGreater = currentPage === numPages;
  const range = currentPage === numPages
    ? `Showing ${firstIndex} to ${rowCount} of ${rowCount} item`
    : `Showing ${firstIndex} to ${lastIndex} of ${rowCount} item`;

  const handlePrevious = useCallback(() => !disabledLesser && onChangePage(currentPage - 1), [currentPage, onChangePage]);
  const handleNext = useCallback(() => !disabledGreater && onChangePage(currentPage + 1), [currentPage, onChangePage]);
  const handleRowsPerPage = useCallback(({ target }) => onChangeRowsPerPage(Number(target.value), currentPage), [currentPage, onChangeRowsPerPage]);
  const handlePage = useCallback(({ target }) => onChangePage(Number(target.innerHTML)), [onChangePage]);

  let pages = [];
    if (currentPage == 1) {
        for (let i = 1; i <= Math.min(3, numPages); i++) {
            pages.push(i);
        }
    } else if (currentPage == numPages) {
        for (let i = Math.max(numPages - 3, 0); i <= numPages; i++) {
            pages.push(i)
        }
    } else {
        pages = [currentPage - 1, currentPage, currentPage + 1];
    }

  const selectOptions = paginationRowsPerPageOptions.map(num => (
    <option
      key={num}
      value={num}
    >
      {num}
    </option>
  ));

  const dynamicPages = pages.map((num: number) => (
        <li key={num} value={num} onClick={handlePage} style={{
            padding: '8px 0px',
            color: 'white',
            alignItems: 'center',
            background: num == currentPage ? '#35363C' : '#26272C'
        }}>
            <a style={{
                background: '#26272C !important',
                margin: '0 2px',
                border: 'none !important',
                boxShadow: 'none !important',
                color: 'white',
                fontWeight: 500,
                position: 'relative',
                display: 'block',
                padding: '.5rem .75rem',
                lineHeight: 1.25
            }}>{num}</a>
        </li>
    ));

  return (
    <div style={{
        width: '100%',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }}>
        <label style={{
            margin: '0',
            color: '#848792',
            fontSize: '1.1rem',
            fontWeight: 600
        }}>{range}</label>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            width: 'fit-content'
        }}>
            <label style={{
                margin: '0',
                color: '#848792',
                fontSize: '1.1rem',
                fontWeight: 600,
                whiteSpace: 'nowrap'
            }}>Item per page</label>
            <select onChange={handleRowsPerPage} defaultValue={rowsPerPage} aria-label="Item per page" style={{
                color: 'white',
                fontSize: '1rem',
                fontWeight: 400,
                borderRadius: '22px',
                border: 'none',
                boxShadow: 'none',
                padding: '0px 21px',
                width: '100%',
                margin: '0 1rem',
                outline: 'none',
                background: '#26272C',
                maxWidth: '90px',
                height: 'calc(1.5em + .75rem + 2px)'
            }}>
                {selectOptions}
            </select>
        </div>
        <ul style={{
            marginTop: 0,
            display: 'flex',
            borderRadius: '.25rem',
            justifyContent: 'flex-end',
            listStyle: 'none',
            padding: 0,
            marginBottom: 0
        }}>
            <li onClick={handlePrevious} style={{
                padding: '8px 0px',
                color: 'white',
                alignItems: 'center',
                background: '#35363C'
            }}>
                <a aria-disabled={disabledLesser} style={{
                    background: '#26272C',
                    margin: '0 2px',
                    border: 'none',
                    boxShadow: 'none',
                    color: 'white',
                    fontWeight: 500,
                    borderTopLeftRadius: '.25rem',
                    borderBottomLeftRadius: '.25rem',
                    position: 'relative',
                    display: 'block',
                    padding: '.5rem .75rem',
                    lineHeight: 1.25,
                    opacity: disabledLesser ? 0.5 : 1
                }}><i className="zmdi zmdi-chevron-left"></i></a>
            </li>
            { dynamicPages }
            <li onClick={handleNext} style={{
                padding: '8px 0px',
                color: 'white',
                alignItems: 'center',
                background: '#35363C'
            }}>
                <a aria-disabled={disabledGreater} style={{
                    background: '#26272C',
                    margin: '0 2px',
                    border: 'none',
                    boxShadow: 'none',
                    color: 'white',
                    fontWeight: 500,
                    borderTopRightRadius: '.25rem',
                    borderBottomRightRadius: '.25rem',
                    position: 'relative',
                    display: 'block',
                    padding: '.5rem .75rem',
                    lineHeight: 1.25,
                    opacity: disabledGreater ? 0.5 : 1
                }}><i className="zmdi zmdi-chevron-right"></i></a>
            </li>
        </ul>
    </div>
  );
};

export default Pagination;
import { RouteComponentProps } from 'react-router';

export type SalesExpensesStateProps = {
    currentRole: number;
    activeMenu: string;
    currentUserId: number;
    saleUserId: number;
}

export type SalesExpensesDispatchProps = {
    setActiveMenu: (activeMenu: string, userId: number) => Promise<any>;
}

export type SalesExpensesProps = RouteComponentProps & SalesExpensesStateProps & SalesExpensesDispatchProps;

export const customTableStyle = {
    headRow: {
        style: {
            backgroundColor: '#26272C',
            borderBottomColor: ' #8775a7'
        }
    },
    headCells: {
        style: {
            paddingLeft: '0',
            paddingRight: '0',
            fontSize: '1rem',
            color: ' #848792'
        },
    },
    rows: {
        style: {
            fontSize: '1rem',
            color: 'white',
            backgroundColor: '#35363C',
            '&:not(:last-of-type)': {
                borderBottomStyle: 'none',
            },
        },
        stripedStyle: {
            color: 'white',
            backgroundColor: '#26272C',
        },
    },
    cells: {
        style: {
            paddingLeft: '0',
            paddingRight: '5px',
            wordBreak: 'break-all'
        },
    },
    noData: {
        style: {
            color: '#848792',
            backgroundColor: '#26272C'
        }
    },
    progress: {
        style: {
            color: '#848792',
            backgroundColor: '#26272C'
        }
    }
};
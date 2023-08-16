import _ from 'lodash';

const USER_AUTHORITY = [
    {
        key: 'GUEST',
        orderable: true,
        bill_monthly: false,
    },
    {
        key: 'VIEWER',
        orderable: false,
        bill_monthly: false,
    },
    {
        key: 'EDITOR',
        orderable: true,
        bill_monthly: true,
    },

]

export const getUserAuthority = (key) => {
    const target = _.find(USER_AUTHORITY, { key });
    if (!target) {
        return {
            key: 'VIEWER',
            orderable: false,
            bill_monthly: false,
        }
    }
    return target
}
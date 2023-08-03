import {
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import i18n from 'i18next';
import { Image } from 'antd';
import LOGO_IMAGE from 'asset/img/LOGO.png';

export const MainNavItems = [
    {
        label: <Image src={LOGO_IMAGE} width={120} preview={false} />,
        key: 'logo',
        path: ''
    },
    {
        label: i18n.t('首頁'),
        key: '/',
        path: ''
    },
    {
        label: i18n.t('產品資訊'),
        key: '/category',
        path: '/category'
    },
]

export const UserNavItems = [
    {
        label: i18n.t('用戶資訊'),
        key: '/user/info',
        path: '/user/info',
        icon: <UserOutlined />
    },
    {
        label: i18n.t('訂單記錄'),
        key: '/order/history',
        path: '/order/history',
        icon: <UserOutlined />
    },
]
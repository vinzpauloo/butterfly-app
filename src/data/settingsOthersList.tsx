import {
    AntDesign,
    SimpleLineIcons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";

export const settingsOthersList = [
    {
        title: "联系客服",
        screen: "CustomerService",
        params: {
            postTitle: 'Test Sender',
            senderUserName: 'Test Sender Username',
            senderMessage: 'Test Sender Message',
            senderImgURL: 'https://randomuser.me/api/portraits/men/3.jpg',
            senderTimeStamp: 'Test Date',
        },
        logo: <AntDesign name={'customerservice'} size={20} color={'#FFFFFF'}/>
    },
    {
        title: "隐私政策",
        screen: "PrivacyPolicy",
        logo: <MaterialIcons name={'policy'} size={20} color={'#FFFFFF'}/>
    },
    {
        title: "服务条款",
        screen: "ServiceProvisions",
        logo: <MaterialIcons name={'notes'} size={20} color={'#FFFFFF'}/>
    },
    {
        title: "关于糖心",
        screen: "About",
        logo: <MaterialCommunityIcons name={'heart-pulse'} size={20} color={'#FFFFFF'}/>
    },
    {
        title: "应用锁",
        screen: "PasscodeLock",
        logo: <SimpleLineIcons name={'lock'} size={20} color={'#FFFFFF'}/>
    },
];

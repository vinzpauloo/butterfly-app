import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  Image,
  StyleSheet, FlatList,
} from "react-native";

import {HStack, VStack} from "native-base";

import Logo from "assets/images/butterfly.png";
import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";

const ServiceProvisions = () => {

  const emailLink = () => {
    return (
        <Text style={{color: 'blue', textDecorationLine: 'underline'}}>linnannan101@gmail.com</Text>
    )
  }

  const listData = [
    {key: 'item1', text: '伪造帐户注册资料,或擅自使用他人的讯息或内\n' +
          '容;'},
    {key: 'item2', text: '以任何方式或任何目的从事非法行为,包含涉及\n' +
          '任何违反个人或实体权利的行为;'},
    {key: 'item3', text: '创建、上传、发布、展示或传播任何以下用户内\n' +
          '容:(一)侵犯他人著作权、商标权、隐私公开\n' +
          '全或其他财产或人身权利(例如使用的姓名、当\n' +
          '像、图像或他人未经同意的身份);'},
    {key: 'item4', text: '创建、拷贝、复制、发布或修改任何不属于您或\n' +
          '未经内容拥有者明确书面许可的内容(包含拍照\n' +
          '或截图等);'},
    {key: 'item5', text: '反编译、逆向工程,或以其他任何方式试图挖掘\n' +
          '获取的 糖心 原始码;'},
    {key: 'item6', text: '干扰任何 糖心 的伺服器、网路或系统相关营运,\n' +
          '包含但不限于孩客攻击、垃圾邮件或进行服务攻\n' +
          '击、破坏或规避防火墙、加密机制、安全认证程\n' +
          '序等,或试图观看您没有明确授权的讯息与他人\n' +
          '帐户;'},
    {key: 'item7', text: '使用任何自动化程序、工具或程式(包含但不限\n' +
          '于网路爬虫、机器人与自动化脚本)来进入糖心\n' +
          '或 糖心 的任何伺服器、网路与相关系统;或从\n' +
          '糖心 中收集或取得内容或资讯;'},
    {key: 'item8', text: '使用 糖心 时进行任何违反本条款或任何适用法律\n' +
          '的行为。'},
    {key: 'item9', text: '禁止利用任何行为,将糖心 既有用户导引至新帐\n' +
          '号或其他帐号消费(例如,不得鼓励糖心既有用\n' +
          '户创新帐号储值,或是导引既有糖心 用户透过非\n' +
          'https://app.糖心 Jive/ 以外连结或非官方认证方\n' +
          '式进行糖心 钻石点数购买)。违者及涉及此行为\n' +
          '之用户将立即拔除该帐号使用权限,无条件收回\n' +
          '其帐号之所有钻石点数,并需赔偿 糖心 相关损\n' +
          '失。'}
  ]

  const listData2 = [
    {key: 'item1', text: '糖心用户应确保糖心用户之任何上传内容,均系\n' +
          '由糖心用户亲自独立构思及创作,绝无侵害任何\n' +
          '人的权益,并且除了在糖心上从未被揭露过。'},
    {key: 'item2', text: '糖心用户若有侵权之虞,应负防止侵害之责。'},
    {key: 'item3', text: '于糖心要求时,糖心用户应负责从糖心用户之任\n' +
          '何上传内容的任何第三方权利拥有者(包括但不\n' +
          '限于糖心用户之上传内容中所描绘或出现的任何\n' +
          '人)取得任何必要之授权,支付任何相关费用,\n' +
          '并应确保糖心得合法使用该权利。'},
    {key: 'item4', text: '糖心用户透过糖心上传之内容,纯属糖心用户个\n' +
          '人行为,本公司对于上传内容而产生的一切纠纷\n' +
          '不承担任何法律责任。'},
  ]

  return (
    <ScrollView style={styles.container}>
      <UserProfileSettingsHeader title={null} btnRight={null}/>

      <VStack style={styles.vStack}>
       <VStack alignItems={'center'}>
         <Image style={styles.logoImage} source={Logo} />
         <Text style={styles.link}>txvlog.com</Text>
         <Text style={styles.title}>服务条款</Text>
       </VStack>
        <Text style={styles.sectionTitle}>关于 糖心</Text>

        <Text style={styles.details}>
          糖心是一个付费浏览的社交通讯应用服务,用户可以透
          过创建、发布私密照片与影片,赚取潜在的获利。这些
          服务条款,包含我们的<Text style={styles.weight}>隐私权政策</Text>(以下统称为<Text style={styles.weight}>「条
          款」</Text>)是您使用 糖心 的规范。若您使用 糖心,表示您
          接受并同意遵守这些规范条款。如果您不同意任一条
          款,或是您不满意糖心,我们唯一的建议是停止使用 糖
          心。我们保留随时修改条款的权利。如果我们做出重大
          变更,我们将努力透过 app 或是官网张贴变更告示,或
          是透过任何其他合理的方式通知您。此外,我们会在更
          新条款后您登入 糖心 时要求您同意更新的条款(例如要
          求您勾选「我同意条款」的按钮)。当您表示同意并持
          续使用 糖心,即表示您同意这些更新条款的规范。当您
          使用 糖心 时,我们与您便会透过电子通讯的方式进行沟
          通,此方式包含电子邮件、推播通知以及 app 系统讯
          息。您了解并同意我们提供给您的协议、通知、讯息发
          布等电子书面形式是符合法定要求的。您了解并同意使
          用 糖心 时会产生行动网路数据费用,且这些数据费用将
          完全由您承担。 我们保留权力在任何时间以任何理由,
          没有责任在有告知或无告知的情况下进行:(一) 修
          改、暂停或终止 糖心 或其任何功能;(二)限定、限
          制、暂停或终止您使用 糖心 或其任何功能;(三)删
          除、屏蔽或禁止您在 糖心心 中张贴的内容;(四)监测
          您使用 糖心 时是否符合遵守条款与任何适用法律(包含
          您在 糖心 所发布或传送的任何内容或讯息)(五)调
          查任何可疑或涉嫌滥用或非法使用 糖心 的行为,并配合
          执法单位调查。
        </Text>

        <Text style={styles.sectionTitle}>使用 糖心
        </Text>

        <Text style={styles.details}>
          您可以让您的追踪者看到您使用 糖心 创建和发布照片与
          影片,您也可以追踪或观看其他糖心 用户的照片与影
          片,亦可以发送私讯给其他 糖心用户。当用户使用 糖
          心 相机功能拍摄照片或影片时,其内容对于 糖心 而言
          是专属独有的,您只能在 糖心 app 中浏览内容,且无法
          分享或输出到 糖心 之外的地方。当用户于糖心 中创建
          照片或影片(以下简称「内容」)时,内容创作者(以
          下简称「创作者」)可以让他/她的追随者(以下简称
          「追随者」)有偿或无偿观看其内容(以下简称分别为
          「免费内容」与「付费内容」)。针对付费内容,创作
          者会依照他/她期望收取的费用,设定一定数量的「糖心
          点数」,而 糖心 将从中收取些许平台服务费。追随者需。
          要在 app 中购买等值「糖心点数」并完成支付才能观看
          该项内容。您可以在 糖心 中查询您的 糖心 点数余额
          (以下简称「余额」),您的余额包含:(一)您已购
          买/储值的 糖心 点数,但尚未花费于其他创作者的付费
          内容;(二)其他跟随者欲观看您的付费内容时所支付
          给您的 糖心 点数以及其他跟随者赠送给您的 糖心 点数
          (以下皆称为「收益」)。<Text style={styles.weight}>
          重要提示:(一)我们不拥
          有或掌控 糖心中的用户内容,所有在 糖心 中交易与互
          动的用户内容仅限于创作者与其追随者之间,糖心若依
          照法令规定或主播要求而删除任何内容时,用户不得異
          议;(二) 若创作者透过平台举办各项私人活动,其内
          容与官方无关,官方亦无责补偿或退款。
        </Text>
        </Text>

        <Text style={styles.sectionTitle}>糖心 使用对象
        </Text>

        <Text style={styles.details}>
          糖心是一个提供给懂得尊重与负责的成年人的社交通讯
          平台,用户可创建任何的影片/照片/文字内容,其中可
          能包含成人资讯。<Text style={styles.weight}>
          当您开始使用 糖心 时,代表已了解
          app 含有成人内容,且声明并保证:&nbsp;&nbsp;&nbsp;&nbsp;
        </Text>(一)您至少年满
          十八岁;(二)您会完全遵守这些条款;(三)您接受
          在任何装置中使用 糖心 的全部责任,无论该装置是否归
          您所有;(四)您接受由您所创建或提供的任何内容的
          全部责任;(五)您在使用 糖心 时,不会违反这些条
          款或任何适用法律。
        </Text>

        <Text style={styles.sectionTitle}>帐号注册
        </Text>

        <Text style={styles.details}>
          您必须注册帐号才能进入并使用 糖心,注册时,您必须
          提供有效的电子邮件地址、用户名称和密码。同时您也
          必须建立 糖心 个人资料与相关内容以完成您的 糖心 个
          人资料。请特别注意在建立帐号的过程中,我们可能会
          需要您的手机号码来进行帐号验证手续。在完成 糖心
          注册前,您声明并保证:(一)所有帐号注册的个人资
          料和内容(包含您从 Facebook 与 Twitter 或其他社群媒
          体服务中导入的内容),是由您提供给我们的真实个人
          资料与内容;(二) 您未曾注册或拥有过 糖心 帐号
          (包含您透过不同的电子邮件、用户名称或手机号码注
          册);(三)如您以前曾拥有过 糖心 帐号,您的旧帐
          号并未因违反这些条款而遭到暂停或终止;(四)您在
          糖心 注册的帐号是您属于您个人且合法的,您不会出
          售、出租、出借、或将您到帐号转移到任何未经本公司
          书面许可的其他人;(五)您无法且您也不会试图透过
          未授权的第三方应用程式登入 糖心。您会为您的帐号发
          生的所有行为承担全部责任,您有责任维护您的登入资
          讯的安全性与保密性,您也同意如果您认为有人未经您
          的许可使用或是正在使用您的帐户,或透过任何违反安
          全的方式引起您的注意,您会立即通知我们。
        </Text>

        <Text style={styles.sectionTitle}>在应用程式中购买
        </Text>

        <Text style={styles.details}>
          若要观看别人的付费内容,您必须在应用程式中购买并
          支付等值 糖心 点数。应用商城可能会取决于您住的地方
          收取销售税(详细资讯请查看您所属的应用商城的条款
          与政策)。<Text style={styles.weight}>
          重要提示:所有应用程式中购买的 糖心 点
          数是无法退款的。
        </Text> 您明确了解并同意,您在 糖心 应用
          程式中购买糖心 点数以观看付费内容,无论提供付费内
          容的创作者或是我们皆不会有任何责任义务为您提供任
          何理由的退款。您也同意我们只有在因 糖心 软体维修或
          其他技术故障而导致您的帐户余额错误时,才会进行必
          要的修正与调整。
        </Text>

        <Text style={styles.sectionTitle}>帐户停用
        </Text>

        <Text style={styles.details}>
          您自行停用 如果您想要停用 糖心 帐户,请联系 糖心 客
          服:{emailLink()}。我们将在收到您的停
          用请求后的 60 个工作日内终止您的帐户。<Text style={styles.weight}>
          重要提示:
          当您的帐户停用后,帐户内剩余的 糖心 点数将被视为永
          久作废。遭官方停用
        </Text> 您明确了解并同意我们保留权利在
          以下情况停用您的帐户:(一)您在使用 糖心 时违反
          了这些条款或任何适用法律;(二)您超过 60 天未登
          入糖心,且经官方通知 7 日后仍未登入 糖心。<Text style={styles.weight}>
          重要提
          示:若您的帐户因以上原因而遭到停用,帐户内剩余的
          糖心 点数将被视为永久作废。
        </Text>
        </Text>

        <Text style={styles.sectionTitle}>禁止行为
        </Text>

        <Text style={styles.weightMargin}>我们要求所有 糖心 用户在任何时候使用 糖心 都能遵守
          条款。您<Text style={styles.weight}>不能</Text>使用 糖心 进行以下行为:</Text>

        <FlatList
            data={listData}
            renderItem={({ item }) => (
                <HStack ml={10} alignItems={'flex-start'}>
                  <Text style={styles.bullet}>&#8226;</Text>
                  <Text style={styles.itemText}>{item.text}</Text>
                </HStack>
            )}
        />

        <Text style={styles.emailLink}>如需回报 糖心 不当使用之行为,请联系 糖心 客服:
          {emailLink()}。</Text>

        <Text style={styles.sectionTitle}>侵权责任
        </Text>

        <FlatList
            data={listData2}
            renderItem={({ item }) => (
                <HStack ml={10} alignItems={'flex-start'}>
                  <Text style={styles.bullet}>&#8226;</Text>
                  <Text style={styles.itemText}>{item.text}</Text>
                </HStack>
            )}
        />

        <Text style={styles.sectionTitle}>适用法律与争议解决
        </Text>

        <Text style={styles.weightMargin}>
          本条款和本文所载的条款如有任何争议或歧见,应先进
          诚意协商解决,若无法达成协议,双方同意专属由台湾
          台北地方法院为管辖法院。您必须在台湾台北地方法院
          解决因本协议或 糖心 而引起的任何导致诉讼行动或纠纷
          (素偿) 的索赔和原因。
        </Text>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: Dimensions.get("window").height,
    maxWidth: Dimensions.get("window").width,
    backgroundColor: "#191d26",
  },
    vStack: {
        marginHorizontal: 30
    },
  contentContainer: {
    marginHorizontal: 30,
    alignItems: "center",
  },
  logoImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  link: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 15,
  },
    sectionTitle: {
        marginVertical: 10,
        color: '#FFF',
        fontWeight: '900',
        fontSize: 15
    },
  details: {
    color: "#FFFFFF",
  },
    weight: {
      fontWeight: '900'
    },
    weightMargin: {
      fontWeight: '900',
        color: '#FFF',
        marginBottom: 10
    },
    emailLink: {
        color: '#FFF',
        marginTop: 10
    },
  bullet: {
    fontSize: 15,
    marginRight: 5,
    color: '#FFF'
  },
  itemText: {
    fontSize: 12,
    color: '#FFF',
  },
});

export default ServiceProvisions;

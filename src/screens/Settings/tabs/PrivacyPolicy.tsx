import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  Image,
  StyleSheet,
} from "react-native";

import {VStack} from "native-base";

import Logo from "assets/images/butterfly.png";
import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import {privacyPolicyData} from "data/privacyPolicyData";
import PrivacyPolicyFlatList from "components/PrivacyPolicyFlatList";

const PrivacyPolicy = () => {

  return (
    <ScrollView style={styles.container}>
      <UserProfileSettingsHeader title={null} btnRight={null}/>

      <VStack style={styles.vStack}>
        <VStack alignItems={'center'}>
          <Image style={styles.logoImage} source={Logo} />
          <Text style={styles.linkText}>txvlog.com</Text>
          <Text style={styles.title}>隐私政策</Text>
        </VStack>

        <Text style={styles.details}>
          本隐私条款说明当您使用我们的网站、手机应用程式或
          其他线上产品和服务(以下统称为「服务」),或者当
          您以其他方式与我们互动时,您的资讯将如何被收集并
          使用于「糖心」。我们可能会随时更改此隐私权条款,
          因此我们鼓励您在使用服务时,随时查看并了解我们最
          新的隐私权条款,以便帮助保护您的资讯隐私。
        </Text>

        <Text style={styles.sectionTitle}>您所提供给我们的资讯</Text>
        <Text style={styles.details}>
          我们会收集您直接提供给我们的资讯。例如,我们会收
          集所有您创建帐户时的资讯,以及使用服务来发送或接
          收的讯息(包含透过我们的服务「糖心」所拍摄的照片
          或影片,以及透过客服或与其他方式与我们沟通时所产
          生的讯息。)我们可能收集的资讯包含用户名称、帐户
          密码、电子邮件地址、电话号码、年龄、性别以及任何
          您选择提供的其他资讯。
        </Text>
        <Text style={styles.details}>
          我们诚心地建议您提供您拥有版权的内容(例如讯息、
          照片、影片、标题)。我们无法防范他人储存您的内容
          (例如拍摄截图),如果您不希望有心人士储存您的某
          些内容,那么您不应使用 糖心 发送该内容。
        </Text>

        <Text style={styles.sectionTitle}>
          我们在您使用服务时所收集的资讯
        </Text>
        <Text style={styles.details}>
          当您使用我们的服务时,我们会自动收集您的以下资
          讯:
        </Text>
        <PrivacyPolicyFlatList list1={true}/>

        <Text style={styles.sectionTitle}>我们从其他人取得的资讯</Text>
        <Text style={styles.listTwo}>
          除了您直接提供给我们的资讯外,我们还会从其他人那
          里获得有关您的资讯,包括:
        </Text>
        <PrivacyPolicyFlatList list2={true}/>

        <Text style={styles.sectionTitle}>我们如何使用资讯</Text>
        <Text style={styles.details}>我们使用您资讯的主要原因是为了提供和改善我们的服
          务。此外,我们使用您的资讯来维护您的安全,并提供
          您可能感兴趣的广告。请继续阅读有关我们使用您资讯
          的各项原因详细说明,以及实际范例。</Text>

        <Text style={styles.sectionTitle}>管理您的帐号,并提供我们的服务给您</Text>
        <PrivacyPolicyFlatList list3={true}/>

        <Text style={styles.sectionTitle}>确保跨装置的一致性体验</Text>
        <PrivacyPolicyFlatList list4={true}/>

        <Text style={styles.sectionTitle}>为您提供新的 糖心 服务</Text>
        <PrivacyPolicyFlatList list5={true}/>

        <Text style={styles.sectionTitle}>改善我们的服务和开发新服务</Text>
        <PrivacyPolicyFlatList list6={true}/>

        <Text style={styles.sectionTitle}>防止、发现和打击诈欺、其他非法或未经授权的活动</Text>
        <PrivacyPolicyFlatList list7={true}/>

        <Text style={styles.sectionTitle}>确保法律遵从性</Text>
        <PrivacyPolicyFlatList list8={true}/>

        <Text style={styles.sectionTitle}>我们如何保护您的资讯</Text>
        <Text style={styles.details}>我们致力防止您的个人资讯遭未经授权的存取或变更、
          披露或销毁。与所有科技公司一样,尽管我们采取措施
          保护您的资讯,但是我们无法承诺,而且您亦不应期
          望,您的个人资讯会始终安全无虞。针对可能存在的漏
          洞和攻击,我们定期监视我们的系统,并定期审查我们
          的资讯收集、储存和处理做法,以更新我们的实体、技
          术和组织安全措施。如果我们怀疑或发现任何违反安全
          的行为,我们可以暂停您使用所有或部分服务,恕不另
          行通知。如果您认为您的帐号或资讯不再安全,请立即
          通知我们。</Text>

        <Text style={styles.sectionTitle}>儿童的隐私</Text>
        <Text style={styles.details}>我们的服务仅限 18 岁(含)以上的使用者使用。我们
          不允许 18 岁以下的使用者使用我们的平台,而且我们
          不会在知情的情况下收集 18 岁以下人士的个人资讯。
          如果您怀疑任何使用者的年龄低于 18 岁,请透过服务
          提供的通报机制,向我们通报疑虑。</Text>

        <Text style={styles.others}>其他</Text>

        <Text style={styles.othersTitle}>帐户资讯</Text>
        <Text style={styles.otherDetails}>您可以在 app 中编辑您的帐号设定,更新您的个人资
          讯。如您有任何问题,请在 {privacyPolicyData.map((item, index)=>(
              item.emailLink.map((item, index)=>(
                  item.text
              ))
          ))}
          与我们联系。</Text>

        <Text style={styles.othersTitle}>推播通知</Text>
        <Text style={styles.otherDetails}>糖心 会发送推播通知或系统提醒到您的装置。您可以在
          您的装置设定中更改通知设定 (iOS),或者透过 app 更
          改通知设定 (Android)。</Text>

        <Text style={styles.otherDetails2}>本公司提供活动资讯通知之服务(包括但不限于以推
          播、简讯或电子邮件之方式不定期发送活动资讯)。若
          您不希望收到任何活动资讯,可随时联系本公司客服,
          本公司客服将协助您取消活动资讯通知之设定。</Text>
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
  linkText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 15,
  },
  details: {
    color: "#FFFFFF",
  },
  sectionTitle: {
    marginVertical: 10,
    color: '#FFF',
    fontWeight: '900',
    fontSize: 15
  },
  listTwo: {
    color: '#FFF',
    marginBottom: 10
  },
  others: {
    marginVertical: 10,
    color: '#FFF',
    fontWeight: '900',
    fontSize: 15
  },
  othersTitle: {
    marginVertical: 10,
    color: '#FFF',
    fontWeight: '900',
    fontSize: 12
  },
  otherDetails: {
    color: '#FFF',
    fontSize: 12
  },
  otherDetails2: {
    color: '#FFF',
    marginVertical: 10,
    fontSize: 12
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

export default PrivacyPolicy;

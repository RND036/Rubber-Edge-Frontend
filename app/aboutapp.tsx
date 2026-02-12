// AboutScreen.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../context/LanguageContext';


const AboutScreen = () => {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  
  const features = [
    {
      icon: "activity",
      title: t.aboutScreen.feature1Title,
      description: t.aboutScreen.feature1Desc
    },
    {
      icon: "trending-up",
      title: t.aboutScreen.feature2Title,
      description: t.aboutScreen.feature2Desc
    },
    {
      icon: "shield",
      title: t.aboutScreen.feature3Title,
      description: t.aboutScreen.feature3Desc
    },
    {
      icon: "database",
      title: t.aboutScreen.feature4Title,
      description: t.aboutScreen.feature4Desc
    }
  ];


  const stats = [
    { value: "98.7%", label: t.aboutScreen.stat1Label },
    { value: "93.4%", label: t.aboutScreen.stat2Label },
    { value: "99.43%", label: t.aboutScreen.stat3Label },
    { value: "6%", label: t.aboutScreen.stat4Label }
  ];


  const team = [
    { role: t.aboutScreen.researcher, name: "Ravishka Dissanayaka", id: "CB012141/22050616" },
    { role: t.aboutScreen.supervisor, name: "Ms. Anutthara Senanayake" },
    { role: t.aboutScreen.assessor, name: "Ms. Valuka Wijayagunawardene" }
  ];


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0FDF4" translucent />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollViewContent, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <LinearGradient
          colors={['#059669', '#047857']}
          style={styles.heroCard}
        >
          <View style={styles.heroHeader}>
            <Icon name="activity" size={40} color="#FFFFFF" />
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>{t.aboutScreen.appName}</Text>
              <Text style={styles.heroSubtitle}>
                {t.aboutScreen.appSubtitle}
              </Text>
            </View>
          </View>
          <Text style={styles.heroDescription}>
            {t.aboutScreen.appDescription}
          </Text>
        </LinearGradient>


        {/* Mission & Vision */}
        <View style={styles.twoColumnContainer}>
          <View style={styles.missionCard}>
            <Icon name="target" size={24} color="#059669" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>{t.aboutScreen.missionTitle}</Text>
            <Text style={styles.cardContent}>
              {t.aboutScreen.missionContent}
            </Text>
          </View>
          
          <View style={styles.missionCard}>
            <Icon name="eye" size={24} color="#059669" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>{t.aboutScreen.visionTitle}</Text>
            <Text style={styles.cardContent}>
              {t.aboutScreen.visionContent}
            </Text>
          </View>
        </View>


        {/* Features */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t.aboutScreen.featuresTitle}</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Icon name={feature.icon} size={24} color="#059669" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>


        {/* Statistics */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t.aboutScreen.statsTitle}</Text>
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>


        {/* Research Background */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t.aboutScreen.researchTitle}</Text>
          <Text style={styles.paragraph}>
            {t.aboutScreen.researchPara1}
          </Text>
          <Text style={styles.paragraph}>
            {t.aboutScreen.researchPara2}
          </Text>
          
          <View style={styles.highlightBox}>
            <Icon name="award" size={20} color="#059669" />
            <Text style={styles.highlightText}>
              {t.aboutScreen.researchHighlight}
            </Text>
          </View>
        </View>


        {/* Research Team */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t.aboutScreen.teamTitle}</Text>
          {team.map((member, index) => (
            <View key={index} style={styles.teamMember}>
              <Icon name="user" size={20} color="#059669" />
              <View style={styles.teamInfo}>
                <Text style={styles.teamRole}>{member.role}</Text>
                <Text style={styles.teamName}>{member.name}</Text>
                {member.id && <Text style={styles.teamId}>{member.id}</Text>}
              </View>
            </View>
          ))}
        </View>


        {/* Key Contributions */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t.aboutScreen.contributionsTitle}</Text>
          
          <ContributionItem
            title={t.aboutScreen.problemDomain}
            items={[
              t.aboutScreen.problemItem1,
              t.aboutScreen.problemItem2,
              t.aboutScreen.problemItem3,
              t.aboutScreen.problemItem4
            ]}
          />
          
          <ContributionItem
            title={t.aboutScreen.researchDomain}
            items={[
              t.aboutScreen.researchItem1,
              t.aboutScreen.researchItem2,
              t.aboutScreen.researchItem3,
              t.aboutScreen.researchItem4
            ]}
          />
        </View>


        {/* Impact */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t.aboutScreen.impactTitle}</Text>
          <Text style={styles.paragraph}>
            {t.aboutScreen.impactIntro}
          </Text>
          
          <ImpactItem icon="check-circle" text={t.aboutScreen.impact1} />
          <ImpactItem icon="check-circle" text={t.aboutScreen.impact2} />
          <ImpactItem icon="check-circle" text={t.aboutScreen.impact3} />
          <ImpactItem icon="check-circle" text={t.aboutScreen.impact4} />
          <ImpactItem icon="check-circle" text={t.aboutScreen.impact5} />
          <ImpactItem icon="check-circle" text={t.aboutScreen.impact6} />
        </View>


        {/* Contact */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t.aboutScreen.contactTitle}</Text>
          <ContactItem icon="mail" label={t.aboutScreen.email} value="info@rubberedge.lk" />
          <ContactItem icon="phone" label={t.aboutScreen.phone} value="+94 11 234 5678" />
          <ContactItem icon="map-pin" label={t.aboutScreen.location} value="Rubber Research Institute of Sri Lanka" />
          <ContactItem icon="globe" label={t.aboutScreen.website} value="www.rubberedge.lk" />
        </View>


        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {t.aboutScreen.footerText}
          </Text>
          <Text style={styles.footerSubtext}>
            {t.aboutScreen.footerSubtext}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};


type ContributionItemProps = {
  title: string;
  items: string[];
};
const ContributionItem: React.FC<ContributionItemProps> = ({ title, items }) => (
  <View style={styles.contributionSection}>
    <Text style={styles.contributionTitle}>{title}</Text>
    {items.map((item: string, index: number) => (
      <View key={index} style={styles.contributionItem}>
        <Text style={styles.contributionBullet}>•</Text>
        <Text style={styles.contributionText}>{item}</Text>
      </View>
    ))}
  </View>
);


type ImpactItemProps = {
  icon: string;
  text: string;
};
const ImpactItem: React.FC<ImpactItemProps> = ({ icon, text }) => (
  <View style={styles.impactItem}>
    <Icon name={icon} size={18} color="#059669" />
    <Text style={styles.impactText}>{text}</Text>
  </View>
);


type ContactItemProps = {
  icon: string;
  label: string;
  value: string;
};
const ContactItem: React.FC<ContactItemProps> = ({ icon, label, value }) => (
  <View style={styles.contactItem}>
    <Icon name={icon} size={20} color="#059669" />
    <View style={styles.contactInfo}>
      <Text style={styles.contactLabel}>{label}</Text>
      <Text style={styles.contactValue}>{value}</Text>
    </View>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  heroCard: {
    margin: 16,
    padding: 24,
    borderRadius: 12,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  heroTextContainer: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#D1FAE5',
    marginTop: 4,
  },
  heroDescription: {
    fontSize: 14,
    color: '#ECFDF5',
    lineHeight: 20,
  },
  twoColumnContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 12,
  },
  missionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 12,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 12,
  },
  featureIconContainer: {
    backgroundColor: '#D1FAE5',
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  highlightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#059669',
  },
  highlightText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 8,
  },
  teamInfo: {
    flex: 1,
  },
  teamRole: {
    fontSize: 13,
    fontWeight: '600',
    color: '#059669',
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 2,
  },
  teamId: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  contributionSection: {
    marginBottom: 16,
  },
  contributionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  contributionItem: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingLeft: 8,
  },
  contributionBullet: {
    fontSize: 14,
    color: '#059669',
    marginRight: 8,
    fontWeight: 'bold',
  },
  contributionText: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  impactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  impactText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 8,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 2,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
});


export default AboutScreen;

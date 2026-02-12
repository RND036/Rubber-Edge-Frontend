// PrivacyPolicyScreen.js
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
import { useLanguage } from '../context/LanguageContext';

const PrivacyPolicyScreen = () => {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0FDF4" translucent />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollViewContent, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Icon name="lock" size={32} color="#059669" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{t.privacyPolicy.title}</Text>
            <Text style={styles.headerSubtitle}>{t.privacyPolicy.lastUpdated}</Text>
          </View>
        </View>


        {/* Privacy Notice */}
        <View style={styles.noticeCard}>
          <Icon name="shield" size={24} color="#2563EB" />
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>{t.privacyPolicy.yourPrivacyMatters}</Text>
            <Text style={styles.noticeText}>
              {t.privacyPolicy.yourPrivacyMattersDesc}
            </Text>
          </View>
        </View>


        {/* Content */}
        <View style={styles.card}>
          <SectionWithIcon
            icon="database"
            number="1"
            title={t.privacyPolicy.informationWeCollect}
            items={[]}
          >
            <SubSection
              title={t.privacyPolicy.personalInformation}
              items={[
                "Name, contact details, and location",
                "Plantation ownership and registration details",
                "User role (Farmer, Officer, Buyer)"
              ]}
            />
            <SubSection
              title={t.privacyPolicy.iotSensorData}
              items={[
                "pH, turbidity, DRC, temperature, and humidity readings",
                "Sensor location and timestamp data",
                "Device identifiers (ESP32 MAC addresses)"
              ]}
            />
            <SubSection
              title={t.privacyPolicy.agriculturalData}
              items={[
                "Plantation size, tree count, and cultivar information",
                "Latex yield and quality history",
                "Disease detection images and results",
                "Growth prediction data"
              ]}
            />
            <SubSection
              title={t.privacyPolicy.transactionData}
              items={[
                "Buyer-seller interactions",
                "Quality certification records",
                "Blockchain transaction hashes (public, non-personal)"
              ]}
            />
          </SectionWithIcon>


          <SectionWithIcon
            icon="eye"
            number="2"
            title={t.privacyPolicy.howWeUseYourInformation}
            items={[
              t.privacyPolicy.howWeUseItem1,
              t.privacyPolicy.howWeUseItem2,
              t.privacyPolicy.howWeUseItem3,
              t.privacyPolicy.howWeUseItem4,
              t.privacyPolicy.howWeUseItem5,
              t.privacyPolicy.howWeUseItem6,
              t.privacyPolicy.howWeUseItem7,
              t.privacyPolicy.howWeUseItem8,
            ]}
            children={null}
          />


          <SectionWithIcon
            icon="share-2"
            number="3"
            title={t.privacyPolicy.informationSharing}
            items={[]}
          >
            <Text style={styles.subsectionContent}>
              {t.privacyPolicy.sharingText}
            </Text>
            <DataSharingItem
              title={t.privacyPolicy.withAgriculturalOfficers}
              description={t.privacyPolicy.withAgriculturalOfficersDesc}
            />
            <DataSharingItem
              title={t.privacyPolicy.withBuyers}
              description={t.privacyPolicy.withBuyersDesc}
            />
            <DataSharingItem
              title={t.privacyPolicy.withRegulatoryAuthorities}
              description={t.privacyPolicy.withRegulatoryAuthoritiesDesc}
            />
            <DataSharingItem
              title={t.privacyPolicy.researchInstitutions}
              description={t.privacyPolicy.researchInstitutionsDesc}
            />
            <DataSharingItem
              title={t.privacyPolicy.serviceProviders}
              description={t.privacyPolicy.serviceProvidersDesc}
            />
            <View style={styles.highlightBox}>
              <Text style={styles.highlightText}>
                {t.privacyPolicy.neverSell}
              </Text>
            </View>
          </SectionWithIcon>


          <SectionWithIcon
            icon="lock"
            number="4"
            title={t.privacyPolicy.dataSecurity}
            items={[
              "End-to-end encryption for data transmission from IoT sensors",
              "Blockchain immutability for transaction records",
              "Secure cloud storage with regular backups",
              "Role-based access controls (farmers can't access buyer data, etc.)",
              "Regular security audits and vulnerability assessments",
              "Two-factor authentication for account access"
            ]}
            children={null}
          />


          <SectionWithIcon
            icon="check-circle"
            number="5"
            title={t.privacyPolicy.yourRights}
            items={[]}
          >
            <Text style={styles.subsectionContent}>{t.privacyPolicy.yourRightsIntro}</Text>
            <View style={styles.listContainer}>
              {[
                "Access your personal and plantation data at any time",
                "Correct inaccurate information in your profile",
                "Delete your account and associated data (excluding blockchain records, which are immutable)",
                "Opt out of data sharing for research purposes",
                "Export your data in a machine-readable format",
                "Withdraw consent for specific data uses"
              ].map((item: string, index: number) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listItemText}>{item}</Text>
                </View>
              ))}
            </View>
            <View style={styles.highlightBox}>
              <Text style={styles.highlightText}>
                {t.privacyPolicy.contactUsText}
              </Text>
            </View>
          </SectionWithIcon>


          <SectionWithIcon
            icon="bell"
            number="6"
            title={t.privacyPolicy.dataRetention}
            items={[
              "Active account data: Retained while your account is active",
              "Historical sensor data: 5 years for agricultural trend analysis",
              "Blockchain records: Permanent (immutable by design)",
              "Disease detection images: 3 years for AI model improvement",
              "Deleted accounts: 30-day grace period before permanent deletion"
            ]}
            children={null}
          />


          <Section
            number="7"
            title={t.privacyPolicy.childrenPrivacy}
            content="Rubber Edge is intended for users 18 years and older. We do not knowingly collect information from minors. If you believe a child has provided us with personal information, please contact us immediately."
          />


          <Section
            number="8"
            title={t.privacyPolicy.changesPolicy}
            content="We may update this Privacy Policy periodically. You will be notified of significant changes via email or in-app notification. Continued use of Rubber Edge after changes constitutes acceptance of the updated policy."
          />


          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>{t.privacyPolicy.contactUs}</Text>
            <Text style={styles.contactSubtitle}>{t.privacyPolicy.contactUsSubtitle}</Text>
            <Text style={styles.contactText}>{t.privacyPolicy.email}</Text>
            <Text style={styles.contactText}>{t.privacyPolicy.phone}</Text>
            <Text style={[styles.contactText, { marginTop: 12 }]}>
              {t.privacyPolicy.dataProtectionOfficer}
            </Text>
            <Text style={styles.contactText}>{t.privacyPolicy.institute}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


type SectionProps = {
  number: string;
  title: string;
  content: string;
};
const Section: React.FC<SectionProps> = ({ number, title, content }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{number}. {title}</Text>
    <Text style={styles.sectionContent}>{content}</Text>
  </View>
);


type SectionWithIconProps = {
  icon: string;
  number: string;
  title: string;
  items?: string[];
  children?: React.ReactNode;
};
const SectionWithIcon: React.FC<SectionWithIconProps> = ({ icon, number, title, items = [], children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Icon name={icon} size={20} color="#059669" />
      <Text style={styles.sectionTitle}>{number}. {title}</Text>
    </View>
    {children}
    {items && items.length > 0 && (
      <View style={styles.listContainer}>
        {items.map((item: string, index: number) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>{item}</Text>
          </View>
        ))}
      </View>
    )}
  </View>
);


type SubSectionProps = {
  title: string;
  items: string[];
};
const SubSection: React.FC<SubSectionProps> = ({ title, items }) => (
  <View style={styles.subsection}>
    <Text style={styles.subsectionTitle}>{title}</Text>
    <View style={styles.listContainer}>
      {items.map((item: string, index: number) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listItemText}>{item}</Text>
        </View>
      ))}
    </View>
  </View>
);


type DataSharingItemProps = {
  title: string;
  description: string;
};
const DataSharingItem: React.FC<DataSharingItemProps> = ({ title, description }) => (
  <View style={styles.dataSharingItem}>
    <Text style={styles.dataSharingTitle}>{title}</Text>
    <Text style={styles.dataSharingDesc}>{description}</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  noticeCard: {
    flexDirection: 'row',
    backgroundColor: '#DBEAFE',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#93C5FD',
    gap: 12,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 4,
  },
  noticeText: {
    fontSize: 13,
    color: '#1E40AF',
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  sectionContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  subsection: {
    marginTop: 12,
    marginLeft: 28,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  subsectionContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginLeft: 28,
    marginBottom: 8,
  },
  listContainer: {
    marginTop: 8,
    marginLeft: 28,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bullet: {
    fontSize: 14,
    color: '#059669',
    marginRight: 8,
    fontWeight: 'bold',
  },
  listItemText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  dataSharingItem: {
    marginLeft: 28,
    marginBottom: 12,
  },
  dataSharingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  dataSharingDesc: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  highlightBox: {
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    marginLeft: 28,
    borderLeftWidth: 3,
    borderLeftColor: '#059669',
  },
  highlightText: {
    fontSize: 14,
    color: '#374151',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
  emailText: {
    color: '#059669',
    fontWeight: '600',
  },
  contactSection: {
    marginTop: 8,
    padding: 16,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
});


export default PrivacyPolicyScreen;

// TermsOfServiceScreen.js
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


const TermsOfServiceScreen = () => {
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
          <Icon name="file-text" size={32} color="#059669" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{t.termsOfServicePage.headerTitle}</Text>
            <Text style={styles.headerSubtitle}>{t.termsOfServicePage.lastUpdated}</Text>
          </View>
        </View>


        {/* Content */}
        <View style={styles.card}>
          <Section
            number="1"
            title={t.termsOfServicePage.section1Title}
            content={t.termsOfServicePage.section1Content}
            listItems={[]}
          />


          <Section
            number="2"
            title={t.termsOfServicePage.section2Title}
            content={t.termsOfServicePage.section2Content}
            listItems={[
              t.termsOfServicePage.section2Item1,
              t.termsOfServicePage.section2Item2,
              t.termsOfServicePage.section2Item3,
              t.termsOfServicePage.section2Item4
            ]}
          />


          <Section
            number="3"
            title={t.termsOfServicePage.section3Title}
            content={t.termsOfServicePage.section3Content}
            listItems={[
              t.termsOfServicePage.section3Item1,
              t.termsOfServicePage.section3Item2,
              t.termsOfServicePage.section3Item3,
              t.termsOfServicePage.section3Item4
            ]}
          />


          <Section
            number="4"
            title={t.termsOfServicePage.section4Title}
            content={t.termsOfServicePage.section4Content}
            listItems={[]}
          />


          <Section
            number="5"
            title={t.termsOfServicePage.section5Title}
            content={t.termsOfServicePage.section5Content}
            listItems={[
              t.termsOfServicePage.section5Item1,
              t.termsOfServicePage.section5Item2,
              t.termsOfServicePage.section5Item3,
              t.termsOfServicePage.section5Item4
            ]}
          />


          <Section
            number="6"
            title={t.termsOfServicePage.section6Title}
            content={t.termsOfServicePage.section6Content}
            listItems={[]}
          />


          <Section
            number="7"
            title={t.termsOfServicePage.section7Title}
            content={t.termsOfServicePage.section7Content}
            listItems={[]}
          />


          <Section
            number="8"
            title={t.termsOfServicePage.section8Title}
            content={t.termsOfServicePage.section8Content}
            listItems={[]}
          />


          <Section
            number="9"
            title={t.termsOfServicePage.section9Title}
            content={t.termsOfServicePage.section9Content}
            listItems={[]}
          />


          <Section
            number="10"
            title={t.termsOfServicePage.section10Title}
            content={t.termsOfServicePage.section10Content}
            listItems={[]}
          />


          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>{t.termsOfServicePage.questionsAboutTerms}</Text>
            <Text style={styles.contactText}>{t.termsOfServicePage.emailContact}</Text>
            <Text style={styles.contactText}>{t.termsOfServicePage.phoneContact}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


// Add type declaration for Section props
type SectionProps = {
  number: string;
  title: string;
  content: string;
  listItems?: string[];
};


const Section: React.FC<SectionProps> = ({ number, title, content, listItems }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{number}. {title}</Text>
    <Text style={styles.sectionContent}>{content}</Text>
    {listItems && listItems.length > 0 && (
      <View style={styles.listContainer}>
        {listItems.map((item: string, index: number) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>{item}</Text>
          </View>
        ))}
      </View>
    )}
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
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  listContainer: {
    marginTop: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingLeft: 8,
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
  contactSection: {
    marginTop: 16,
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
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
});


export default TermsOfServiceScreen;

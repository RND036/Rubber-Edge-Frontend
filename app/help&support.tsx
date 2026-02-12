// HelpSupportScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useLanguage } from '../context/LanguageContext';


const HelpSupportScreen = () => {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'officer' | 'buyer'>('farmer');


  const faqData = {
    farmer: [
      {
        q: t.helpSupport.farmerQ1,
        a: t.helpSupport.farmerA1
      },
      {
        q: t.helpSupport.farmerQ2,
        a: t.helpSupport.farmerA2
      },
      {
        q: t.helpSupport.farmerQ3,
        a: t.helpSupport.farmerA3
      },
      {
        q: t.helpSupport.farmerQ4,
        a: t.helpSupport.farmerA4
      },
      {
        q: t.helpSupport.farmerQ5,
        a: t.helpSupport.farmerA5
      }
    ],
    officer: [
      {
        q: t.helpSupport.officerQ1,
        a: t.helpSupport.officerA1
      },
      {
        q: t.helpSupport.officerQ2,
        a: t.helpSupport.officerA2
      },
      {
        q: t.helpSupport.officerQ3,
        a: t.helpSupport.officerA3
      },
      {
        q: t.helpSupport.officerQ4,
        a: t.helpSupport.officerA4
      }
    ],
    buyer: [
      {
        q: t.helpSupport.buyerQ1,
        a: t.helpSupport.buyerA1
      },
      {
        q: t.helpSupport.buyerQ2,
        a: t.helpSupport.buyerA2
      },
      {
        q: t.helpSupport.buyerQ3,
        a: t.helpSupport.buyerA3
      },
      {
        q: t.helpSupport.buyerQ4,
        a: t.helpSupport.buyerA4
      }
    ]
  };


  const contactMethods = [
    { icon: "phone", label: t.helpSupport.callSupport, value: "+94 11 234 5678", action: "tel:+94112345678" },
    { icon: "mail", label: t.helpSupport.emailSupport, value: "support@rubberedge.lk", action: "mailto:support@rubberedge.lk" },
    { icon: "message-circle", label: t.helpSupport.whatsAppSupport, value: "+94 77 123 4567", action: "whatsapp://send?phone=+94771234567" }
  ];


  const handleContact = (action: string) => {
    Linking.openURL(action).catch(err => console.error('Error opening link:', err));
  };


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
          <Icon name="help-circle" size={32} color="#059669" />
          <Text style={styles.headerTitle}>{t.helpSupport.title}</Text>
        </View>


        {/* Role Selector */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t.helpSupport.selectYourRole}</Text>
          <View style={styles.roleContainer}>
            {[
              { id: 'farmer', label: t.helpSupport.farmer, icon: 'users' },
              { id: 'officer', label: t.helpSupport.officer, icon: 'shield' },
              { id: 'buyer', label: t.helpSupport.buyer, icon: 'trending-up' }
            ].map(role => (
              <TouchableOpacity
                key={role.id}
                style={[
                  styles.roleButton,
                  selectedRole === role.id && styles.roleButtonActive
                ]}
                onPress={() => setSelectedRole(role.id as 'farmer' | 'officer' | 'buyer')}
              >
                <Icon 
                  name={role.icon} 
                  size={32} 
                  color={selectedRole === role.id ? '#059669' : '#9CA3AF'} 
                />
                <Text style={[
                  styles.roleLabel,
                  selectedRole === role.id && styles.roleLabelActive
                ]}>
                  {role.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>


        {/* FAQ Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t.helpSupport.frequentlyAskedQuestions}</Text>
          {faqData[selectedRole].map((faq: { q: string; a: string }, index: number) => (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity
                style={styles.faqQuestion}
                onPress={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
              >
                <Text style={styles.faqQuestionText}>{faq.q}</Text>
                <Icon 
                  name={expandedFAQ === index ? "chevron-down" : "chevron-right"} 
                  size={20} 
                  color={expandedFAQ === index ? "#059669" : "#9CA3AF"} 
                />
              </TouchableOpacity>
              {expandedFAQ === index && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.faqAnswerText}>{faq.a}</Text>
                </View>
              )}
            </View>
          ))}
        </View>


        {/* Contact Support */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t.helpSupport.contactSupport}</Text>
          {contactMethods.map((method, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactItem}
              onPress={() => handleContact(method.action)}
            >
              <Icon name={method.icon} size={24} color="#059669" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>{method.label}</Text>
                <Text style={styles.contactValue}>{method.value}</Text>
              </View>
              <Icon name="external-link" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};


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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  roleButtonActive: {
    borderColor: '#059669',
    backgroundColor: '#F0FDF4',
  },
  roleLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  roleLabelActive: {
    color: '#059669',
  },
  faqItem: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 12,
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: '#F9FAFB',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 12,
    gap: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  contactValue: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});


export default HelpSupportScreen;

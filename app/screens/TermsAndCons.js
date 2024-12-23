import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import myTheme from '../utils/theme';
import { useLogin } from '../utils/LoginProvider';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const TermsAndCons = ({ navigation }) => {

     const { COLORS, screenHeight, screenWidth, STYLES } = myTheme();
     const { isLoggedIn, setIsLoggedIn, profile, setProfile } = useLogin();
     const { navigate } = useNavigation();

     const BackHandler = () => (
          <View style={{ flexDirection: 'row' }}>
               <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 60, paddingRight: 0 }} onPress={() => {
                    navigate('More')
               }}>
                    <AntDesign color={COLORS.outline} name='left' size={18} />
               </TouchableOpacity>
          </View>
     )

     return (
          <View style={{ backgroundColor: COLORS.surface }}>
               <Header title='Ts & Cs' titleColor={COLORS.outline} leftView={<BackHandler />} />
               <ScrollView style={{ paddingHorizontal: 10, marginBottom: 110 }}>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Introduction</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>Tuma Mina  provides delivery services through our mobile application . By using the app, you  agree to these terms and conditions.</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>User Aggrement</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>a. Eligibility: You must be 16+ years old to use the app.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>b. Registration: Provide accurate information during registration.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>c. Password Security: Maintain confidentiality.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>d. Prohibited Activities: No unauthorized usage or data exploitation.</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Delivery Services</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>a. Service Availability: Subject to operational hours and locations.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>b. Delivery Times: Estimates, not guarantees.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>c. Cancellation: We reserve the right to cancel orders.</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Payment</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>a. Methods: Various payment options available.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>b. Refunds: Processed within .Here are the Refund Processing Timeframes:</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10, fontStyle: 'italic' }}>Refund Processing Timeframes</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Same-Day Refund (within 2-4 hours)</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>Cancelled orders before pickup, 6 items due to Tuma Mina's error.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Next-Business-Day Refund (within 24 hours)</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>Cancelled orders after pickup, undelivered items due to customer error.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Standard Refund (within 3-5 business days)</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>Disputed deliveries or refund requests.</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Liability</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>a. We disclaim liability for damages or losses.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>b. We disclaim liability for damages or losses.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Governing Laws</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>a. Zimbabwe laws govern these Terms.</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Changes</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>We reserve the right to update these Terms.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Refund Policy</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>1. Eligibility: Refunds for cancelled orders or undelivered items.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>2. Process: Refunds processed within timeframe mentioned above </Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>3. Method: Original payment method.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Cancellation Policy</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>1. User-Initiated Cancellations</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>a. Orders can be cancelled before confirmation.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>b. Cancellations must be requested through the App or via contact information</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>c. Refunds will be processed within timeframes</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Tuma Mina-Initiated Cancellations</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>a. We reserve the right to cancel orders due to operational constraints, unforeseen circumstances, suspected fraudulent activity, or non-compliance with Terms and Conditions.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>b. Users will receive notification of cancellation via communication channes.</Text>


                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>c. Eligible cancellations will receive refunds processed within the mentione</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Privacy Policy</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>Effective Date</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Introduction</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>Tuma Mina values your privacy. This policy explains how we collect, use, and protect your data.</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>1. Information Collection</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>a. Personal Data: Name, email, phone number, location.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>b. Usage Data: App interactions, device information.</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Data Usage</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>a. Service Improvement</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>b. Communication</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>c. Compliance with laws</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Data Sharing</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>a. Third-party service providers</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>b. Business partners</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>c. Law enforcement (if required)</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Data Security</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>a. Industry-standard measures</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>b. There is no guarantee against breaches</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>User Rights</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>a. Access</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>b. Correction</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>c. Deletion</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Changes</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>We reserve the right to update this policy.</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Cookie Policy</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>We use cookies to enhance your experience.</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10 }}>Disclaimer</Text>

                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>Tuma Mina disclaims liability for third-party services.</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'DMSansRegular', color: COLORS.outline }}>By using Tuma Mina's services, you acknowledge acceptance of these Terms and Conditions, Refund Policy, Cancellation Policy, and Privacy Policy.</Text>

               </ScrollView>
          </View>
     )
}

export default TermsAndCons

const styles = StyleSheet.create({})
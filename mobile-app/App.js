import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// ---------------------------------------------------------------------------
// Simulated engine & AI data (no real sensors or trained model)
// ---------------------------------------------------------------------------
const ENGINE_DATA = {
  unit: 'ME-01 Main Propulsion Engine',
  temperature: '92°C',
  oilPressure: 'Low',
  vibrationLevel: 'High',
  operatingHours: '1340 h',
  lastMaintenance: '78 days ago',
  healthScore: 68,
  riskLevel: 'High',
  aiConfidence: '87%',
  possibleFault: 'Cooling system or lubrication problem',
  recommendedAction:
    'Check cooling system and oil circulation within 24 hours',
};

const CHECKLIST_ITEMS = [
  'Check coolant level',
  'Inspect oil pressure',
  'Check filter quality',
  'Listen for bearing noise',
  'Record temperature after test run',
];

const FEEDBACK_OPTIONS = ['Correct', 'Partially correct', 'Incorrect'];

// ---------------------------------------------------------------------------
// Theme colours (aligned with the main MarineAI website)
// ---------------------------------------------------------------------------
const COLORS = {
  navy: '#0a2540',
  navyLight: '#1a3a5c',
  ocean: '#1e6091',
  teal: '#2a9d8f',
  accent: '#00b4d8',
  surface: '#f0f7fa',
  white: '#ffffff',
  text: '#1a2b3c',
  textMuted: '#5a7184',
  border: '#d0e3ed',
  warning: '#e9a319',
  danger: '#d64045',
};

const Stack = createNativeStackNavigator();

// ---------------------------------------------------------------------------
// Reusable UI components
// ---------------------------------------------------------------------------
function ScreenHeader({ title, subtitle }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function StatCard({ label, value, highlight }) {
  return (
    <View style={[styles.statCard, highlight && styles.statCardHighlight]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, highlight && styles.statValueHighlight]}>
        {value}
      </Text>
    </View>
  );
}

function NavButton({ title, onPress, variant = 'primary' }) {
  return (
    <TouchableOpacity
      style={[styles.button, variant === 'secondary' && styles.buttonSecondary]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'secondary' && styles.buttonTextSecondary,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function RiskBadge({ level }) {
  const isHigh = level === 'High';
  return (
    <View style={[styles.badge, isHigh ? styles.badgeDanger : styles.badgeWarning]}>
      <Text style={styles.badgeText}>{level} Risk</Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Screen 1: Technician Dashboard
// ---------------------------------------------------------------------------
function DashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ScreenHeader
          title="Technician Dashboard"
          subtitle="MarineAI · Simulated maintenance alerts"
        />

        <View style={styles.alertBanner}>
          <Text style={styles.alertBannerLabel}>Active Alert</Text>
          <Text style={styles.alertBannerTitle}>{ENGINE_DATA.unit}</Text>
          <RiskBadge level={ENGINE_DATA.riskLevel} />
        </View>

        <View style={styles.statsGrid}>
          <StatCard label="Health Score" value={`${ENGINE_DATA.healthScore}/100`} highlight />
          <StatCard label="Operating Hours" value={ENGINE_DATA.operatingHours} />
          <StatCard label="Temperature" value={ENGINE_DATA.temperature} />
          <StatCard label="Last Service" value={ENGINE_DATA.lastMaintenance} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <NavButton title="View Alert Detail" onPress={() => navigation.navigate('AlertDetail')} />
          <NavButton
            title="AI Recommendation"
            onPress={() => navigation.navigate('AIRecommendation')}
            variant="secondary"
          />
          <NavButton
            title="Maintenance Checklist"
            onPress={() => navigation.navigate('MaintenanceChecklist')}
            variant="secondary"
          />
          <NavButton
            title="Technician Feedback"
            onPress={() => navigation.navigate('TechnicianFeedback')}
            variant="secondary"
          />
        </View>

        <Text style={styles.disclaimer}>
          Prototype only — data is simulated, not from real sensors.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Screen 2: Alert Detail
// ---------------------------------------------------------------------------
function AlertDetailScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ScreenHeader title="Alert Detail" subtitle={ENGINE_DATA.unit} />

        <View style={styles.detailCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Risk Level</Text>
            <RiskBadge level={ENGINE_DATA.riskLevel} />
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Engine Health</Text>
            <Text style={styles.detailValue}>{ENGINE_DATA.healthScore}/100</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>AI Confidence</Text>
            <Text style={styles.detailValue}>{ENGINE_DATA.aiConfidence}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Sensor Readings (Simulated)</Text>
        <View style={styles.sensorList}>
          <SensorRow label="Temperature" value={ENGINE_DATA.temperature} status="warning" />
          <SensorRow label="Oil Pressure" value={ENGINE_DATA.oilPressure} status="danger" />
          <SensorRow label="Vibration Level" value={ENGINE_DATA.vibrationLevel} status="danger" />
          <SensorRow label="Operating Hours" value={ENGINE_DATA.operatingHours} />
          <SensorRow label="Last Maintenance" value={ENGINE_DATA.lastMaintenance} />
        </View>

        <NavButton
          title="View AI Recommendation"
          onPress={() => navigation.navigate('AIRecommendation')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function SensorRow({ label, value, status }) {
  const statusColor =
    status === 'danger' ? COLORS.danger : status === 'warning' ? COLORS.warning : COLORS.text;
  return (
    <View style={styles.sensorRow}>
      <Text style={styles.sensorLabel}>{label}</Text>
      <Text style={[styles.sensorValue, status && { color: statusColor }]}>{value}</Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Screen 3: AI Recommendation
// ---------------------------------------------------------------------------
function AIRecommendationScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ScreenHeader
          title="AI Recommendation"
          subtitle="Simulated decision-support output"
        />

        <View style={styles.aiCard}>
          <Text style={styles.aiCardLabel}>AI Confidence</Text>
          <Text style={styles.aiConfidence}>{ENGINE_DATA.aiConfidence}</Text>
          <Text style={styles.aiNote}>
            Based on simulated sensor patterns — not a live trained model.
          </Text>
        </View>

        <View style={styles.recommendationBlock}>
          <Text style={styles.blockTitle}>Possible Fault</Text>
          <Text style={styles.blockBody}>{ENGINE_DATA.possibleFault}</Text>
        </View>

        <View style={[styles.recommendationBlock, styles.recommendationAction]}>
          <Text style={styles.blockTitle}>Recommended Action</Text>
          <Text style={styles.blockBody}>{ENGINE_DATA.recommendedAction}</Text>
        </View>

        <View style={styles.logicBox}>
          <Text style={styles.logicTitle}>Simulated AI Logic</Text>
          <Text style={styles.logicText}>
            IF temperature &gt; 85°C AND oil pressure = Low AND vibration = High{'\n'}
            THEN risk = High, fault = cooling/lubrication issue
          </Text>
        </View>

        <NavButton
          title="Open Maintenance Checklist"
          onPress={() => navigation.navigate('MaintenanceChecklist')}
        />
        <NavButton
          title="Submit Feedback"
          onPress={() => navigation.navigate('TechnicianFeedback')}
          variant="secondary"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Screen 4: Maintenance Checklist
// ---------------------------------------------------------------------------
function MaintenanceChecklistScreen({ navigation }) {
  const [checked, setChecked] = useState({});

  const toggleItem = (index) => {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const completedCount = CHECKLIST_ITEMS.filter((_, i) => checked[i]).length;
  const allDone = completedCount === CHECKLIST_ITEMS.length;

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ScreenHeader
          title="Maintenance Checklist"
          subtitle={`${completedCount} of ${CHECKLIST_ITEMS.length} tasks completed`}
        />

        {CHECKLIST_ITEMS.map((item, index) => (
          <TouchableOpacity
            key={item}
            style={[styles.checklistItem, checked[index] && styles.checklistItemDone]}
            onPress={() => toggleItem(index)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, checked[index] && styles.checkboxChecked]}>
              {checked[index] ? <Text style={styles.checkmark}>✓</Text> : null}
            </View>
            <Text style={[styles.checklistText, checked[index] && styles.checklistTextDone]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}

        {allDone ? (
          <View style={styles.successBox}>
            <Text style={styles.successText}>All checklist items completed.</Text>
          </View>
        ) : null}

        <NavButton
          title="Rate AI Recommendation"
          onPress={() => navigation.navigate('TechnicianFeedback')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Screen 5: Technician Feedback
// ---------------------------------------------------------------------------
function TechnicianFeedbackScreen() {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected) {
      setSubmitted(true);
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ScreenHeader
          title="Technician Feedback"
          subtitle="Was the AI recommendation helpful?"
        />

        <Text style={styles.feedbackPrompt}>
          After completing the checklist, rate how accurate the simulated AI
          recommendation was for this alert.
        </Text>

        {FEEDBACK_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.feedbackOption,
              selected === option && styles.feedbackOptionSelected,
            ]}
            onPress={() => {
              setSelected(option);
              setSubmitted(false);
            }}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.radio,
                selected === option && styles.radioSelected,
              ]}
            />
            <Text
              style={[
                styles.feedbackOptionText,
                selected === option && styles.feedbackOptionTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}

        <NavButton title="Submit Feedback" onPress={handleSubmit} />

        {submitted ? (
          <View style={styles.successBox}>
            <Text style={styles.successText}>
              Thank you! Your feedback ({selected}) was recorded locally for this
              prototype session.
            </Text>
          </View>
        ) : null}

        <Text style={styles.disclaimer}>
          Feedback is not sent to a server — prototype only.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// App entry
// ---------------------------------------------------------------------------
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.navy },
            headerTintColor: COLORS.white,
            headerTitleStyle: { fontWeight: '600' },
            contentStyle: { backgroundColor: COLORS.surface },
          }}
        >
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ title: 'MarineAI Technician' }}
          />
          <Stack.Screen
            name="AlertDetail"
            component={AlertDetailScreen}
            options={{ title: 'Alert Detail' }}
          />
          <Stack.Screen
            name="AIRecommendation"
            component={AIRecommendationScreen}
            options={{ title: 'AI Recommendation' }}
          />
          <Stack.Screen
            name="MaintenanceChecklist"
            component={MaintenanceChecklistScreen}
            options={{ title: 'Checklist' }}
          />
          <Stack.Screen
            name="TechnicianFeedback"
            component={TechnicianFeedbackScreen}
            options={{ title: 'Feedback' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.navy,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  alertBanner: {
    backgroundColor: COLORS.navy,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  alertBannerLabel: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  alertBannerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statCardHighlight: {
    borderColor: COLORS.teal,
    backgroundColor: '#e8f6f4',
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.navy,
  },
  statValueHighlight: {
    color: COLORS.teal,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.navy,
    marginBottom: 12,
  },
  button: {
    backgroundColor: COLORS.ocean,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.ocean,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: COLORS.ocean,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeDanger: {
    backgroundColor: COLORS.danger,
  },
  badgeWarning: {
    backgroundColor: COLORS.warning,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  detailCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.navy,
  },
  sensorList: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  sensorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sensorLabel: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  sensorValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.navy,
  },
  aiCard: {
    backgroundColor: COLORS.navyLight,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  aiCardLabel: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: '600',
  },
  aiConfidence: {
    color: COLORS.white,
    fontSize: 36,
    fontWeight: '700',
    marginVertical: 8,
  },
  aiNote: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
  },
  recommendationBlock: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  recommendationAction: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.teal,
  },
  blockTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  blockBody: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
  logicBox: {
    backgroundColor: '#e8eef3',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
  },
  logicTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.navy,
    marginBottom: 6,
  },
  logicText: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  checklistItemDone: {
    backgroundColor: '#e8f6f4',
    borderColor: COLORS.teal,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.teal,
    borderColor: COLORS.teal,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  checklistText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
  },
  checklistTextDone: {
    color: COLORS.teal,
    textDecorationLine: 'line-through',
  },
  feedbackPrompt: {
    fontSize: 15,
    color: COLORS.textMuted,
    lineHeight: 22,
    marginBottom: 20,
  },
  feedbackOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  feedbackOptionSelected: {
    borderColor: COLORS.ocean,
    backgroundColor: '#e8f4fa',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: 14,
  },
  radioSelected: {
    borderColor: COLORS.ocean,
    backgroundColor: COLORS.ocean,
  },
  feedbackOptionText: {
    fontSize: 16,
    color: COLORS.text,
  },
  feedbackOptionTextSelected: {
    fontWeight: '600',
    color: COLORS.navy,
  },
  successBox: {
    backgroundColor: '#e8f6f4',
    borderRadius: 10,
    padding: 14,
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.teal,
  },
  successText: {
    color: COLORS.teal,
    fontSize: 14,
    lineHeight: 20,
  },
  disclaimer: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
});

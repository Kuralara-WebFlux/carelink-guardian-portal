/**
 * Resident Risk Analytics Engine
 * Calculates clinical, analytics, and overall risk levels alongside explainable contributions.
 */

export const calculateRiskAndFactors = (vitals, conditions = [], medications = [], settings = null) => {
  let riskLevel = "Low";
  const riskFactors = [];

  const addFactor = (factorRisk, description) => {
    const levels = { Low: 1, Medium: 2, High: 3, Critical: 4 };
    if (levels[factorRisk] > levels[riskLevel]) {
      riskLevel = factorRisk;
    }
    riskFactors.push(`[${factorRisk}] ${description}`);
  };

  const config = settings?.clinical || {
    spo2Critical: 90,
    spo2High: 94,
    spo2Medium: 96,
    pulseCriticalMin: 50,
    pulseCriticalMax: 120,
    pulseHighMin: 60,
    pulseHighMax: 100,
    pulseMediumMin: 65,
    pulseMediumMax: 90,
    tempCriticalMin: 95,
    tempCriticalMax: 103,
    tempHighMin: 96,
    tempHighMax: 100.4,
    tempMediumMin: 99.0,
    sugarCriticalMin: 70,
    sugarCriticalMax: 250,
    sugarHighMin: 80,
    sugarHighMax: 140,
    sugarMediumMin: 120,
    bpSystolicCritical: 180,
    bpSystolicHigh: 140,
    bpSystolicMedium: 120,
    bpDiastolicCritical: 120,
    bpDiastolicHigh: 90,
    bpDiastolicMedium: 80,
    bmiCriticalMin: 15,
    bmiCriticalMax: 40,
    bmiHighMin: 18.5,
    bmiHighMax: 30,
    bmiMediumMin: 25,
    chronicConditionsHigh: 4,
    chronicConditionsMedium: 2,
    polypharmacyHigh: 5,
    polypharmacyMedium: 3,
  };

  const spo2 = parseFloat(vitals?.spo2);
  if (!isNaN(spo2)) {
    if (spo2 <= config.spo2Critical) addFactor("Critical", `Low SpO2: ${spo2}% (<= ${config.spo2Critical}%)`);
    else if (spo2 < config.spo2High) addFactor("High", `Low SpO2: ${spo2}% (< ${config.spo2High}%)`);
    else if (spo2 < config.spo2Medium) addFactor("Medium", `Borderline SpO2: ${spo2}% (< ${config.spo2Medium}%)`);
  }

  const pulse = parseFloat(vitals?.pulse);
  if (!isNaN(pulse)) {
    if (pulse < config.pulseCriticalMin || pulse > config.pulseCriticalMax) 
      addFactor("Critical", `Abnormal Pulse: ${pulse} bpm (<${config.pulseCriticalMin} or >${config.pulseCriticalMax})`);
    else if (pulse < config.pulseHighMin || pulse > config.pulseHighMax) 
      addFactor("High", `Elevated/Low Pulse: ${pulse} bpm (<${config.pulseHighMin} or >${config.pulseHighMax})`);
    else if (pulse < config.pulseMediumMin || pulse > config.pulseMediumMax) 
      addFactor("Medium", `Mild Pulse deviation: ${pulse} bpm`);
  }

  const temp = parseFloat(vitals?.temperature);
  if (!isNaN(temp)) {
    if (temp >= config.tempCriticalMax || temp <= config.tempCriticalMin) 
      addFactor("Critical", `Abnormal Temp: ${temp}°F (>=${config.tempCriticalMax} or <=${config.tempCriticalMin})`);
    else if (temp >= config.tempHighMax || temp <= config.tempHighMin) 
      addFactor("High", `Fever/Low Temp: ${temp}°F (>=${config.tempHighMax} or <=${config.tempHighMin})`);
    else if (temp >= config.tempMediumMin) 
      addFactor("Medium", `Mild Temp elevation: ${temp}°F`);
  }

  const sugar = parseFloat(vitals?.bloodSugar);
  if (!isNaN(sugar)) {
    if (sugar < config.sugarCriticalMin || sugar >= config.sugarCriticalMax) 
      addFactor("Critical", `Abnormal Blood Sugar: ${sugar} mg/dL (<${config.sugarCriticalMin} or >=${config.sugarCriticalMax})`);
    else if (sugar >= config.sugarHighMax || sugar < config.sugarHighMin) 
      addFactor("High", `High/Low Blood Sugar: ${sugar} mg/dL (>=${config.sugarHighMax} or <${config.sugarHighMin})`);
    else if (sugar >= config.sugarMediumMin) 
      addFactor("Medium", `Elevated Blood Sugar: ${sugar} mg/dL`);
  }

  const sys = parseFloat(vitals?.bloodPressure?.systolic);
  const dia = parseFloat(vitals?.bloodPressure?.diastolic);
  if (!isNaN(sys)) {
    if (sys >= config.bpSystolicCritical) addFactor("Critical", `Hypertensive BP: Systolic ${sys} mmHg (>= ${config.bpSystolicCritical})`);
    else if (sys >= config.bpSystolicHigh) addFactor("High", `High BP: Systolic ${sys} mmHg (>= ${config.bpSystolicHigh})`);
    else if (sys >= config.bpSystolicMedium) addFactor("Medium", `Elevated BP: Systolic ${sys} mmHg (>= ${config.bpSystolicMedium})`);
  }
  if (!isNaN(dia)) {
    if (dia >= config.bpDiastolicCritical) addFactor("Critical", `Hypertensive BP: Diastolic ${dia} mmHg (>= ${config.bpDiastolicCritical})`);
    else if (dia >= config.bpDiastolicHigh) addFactor("High", `High BP: Diastolic ${dia} mmHg (>= ${config.bpDiastolicHigh})`);
    else if (dia >= config.bpDiastolicMedium) addFactor("Medium", `Elevated BP: Diastolic ${dia} mmHg (>= ${config.bpDiastolicMedium})`);
  }

  const bmi = parseFloat(vitals?.bmi);
  if (!isNaN(bmi)) {
    if (bmi >= config.bmiCriticalMax || bmi < config.bmiCriticalMin) addFactor("Critical", `Abnormal BMI: ${bmi}`);
    else if (bmi >= config.bmiHighMax || bmi < config.bmiHighMin) addFactor("High", `Elevated BMI: ${bmi}`);
    else if (bmi >= config.bmiMediumMin) addFactor("Medium", `Borderline BMI: ${bmi}`);
  }

  const condCount = Array.isArray(conditions) ? conditions.length : 0;
  if (condCount >= config.chronicConditionsHigh) addFactor("High", `Multiple Chronic Conditions (${condCount})`);
  else if (condCount >= config.chronicConditionsMedium) addFactor("Medium", `Chronic Conditions (${condCount})`);

  const medCount = Array.isArray(medications) ? medications.length : 0;
  if (medCount >= config.polypharmacyHigh) addFactor("High", `Polypharmacy (Medications: ${medCount})`);
  else if (medCount >= config.polypharmacyMedium) addFactor("Medium", `Medications: ${medCount}`);

  return { riskLevel, riskFactors };
};

export function calculateResidentRiskAnalytics(resident, settings = null) {
  const clinicalWeights = settings?.weights || {
    clinical: 30,
    vitalsTrend: 20,
    wellnessTrend: 15,
    compliance: 20,
    missedMedication: 15,
    monitoring: 10,
  };
  const escalationConfig = settings?.escalation || {
    missedMedsCount: 2,
    lowSpo2Count: 2,
    lowSpo2Value: 92,
    consecutiveMissedTasksCount: 3,
  };

  // 1. Existing Clinical Risk Engine (remains intact)
  const { riskLevel: clinicalRiskLevel, riskFactors: clinicalRiskFactors } = calculateRiskAndFactors(
    resident.latestVitals || resident.baselineVitals,
    resident.chronicConditions,
    resident.currentMedications,
    settings
  );

  const contributingFactors = [];

  // 2. Contributions Calculation
  // A. clinical (up to clinicalWeights.clinical points)
  let clinicalContribution = 0;
  if (clinicalRiskLevel === "Critical") {
    clinicalContribution = clinicalWeights.clinical;
    contributingFactors.push("Critical baseline clinical risk factors detected.");
  } else if (clinicalRiskLevel === "High") {
    clinicalContribution = Math.round(clinicalWeights.clinical * (2 / 3));
    contributingFactors.push("High baseline clinical risk factors detected.");
  } else if (clinicalRiskLevel === "Medium") {
    clinicalContribution = Math.round(clinicalWeights.clinical * (1 / 3));
    contributingFactors.push("Moderate baseline clinical risk factors detected.");
  }

  // B. vitalsTrend (up to clinicalWeights.vitalsTrend points)
  let vitalsTrendContribution = 0;
  let worseningBp = false;
  let repeatedLowSpo2 = false;

  const vitalsHistory = resident.vitalsHistory || [];
  if (vitalsHistory.length >= 3) {
    const sysVals = vitalsHistory.slice(0, 4).map(l => l.bloodPressure?.systolic).filter(v => v !== undefined && !isNaN(v));
    if (sysVals.length >= 3 && sysVals[0] > sysVals[1] && sysVals[1] > sysVals[2]) {
      worseningBp = true;
    }
  }

  const lowSpo2Threshold = settings?.clinical?.spo2High ?? 94;
  const lowSpo2Count = vitalsHistory.slice(0, 5).filter(l => parseFloat(l.spo2) < lowSpo2Threshold).length;
  const lowSpo2CountThreshold = escalationConfig.lowSpo2Count ?? 2;
  if (lowSpo2Count >= lowSpo2CountThreshold) {
    repeatedLowSpo2 = true;
  }

  if (worseningBp) {
    vitalsTrendContribution += Math.round(clinicalWeights.vitalsTrend / 2);
    contributingFactors.push("Worsening Blood Pressure Trend.");
  }
  if (repeatedLowSpo2) {
    vitalsTrendContribution += Math.round(clinicalWeights.vitalsTrend / 2);
    contributingFactors.push(`Repeated low SpO2 events (${lowSpo2Count} times recently).`);
  }

  // C. wellnessTrend (up to clinicalWeights.wellnessTrend points)
  let wellnessTrendContribution = 0;
  let decliningWellness = false;
  const wh = resident.wellnessHistory || [];
  if (wh.length >= 3) {
    const latestScore = wh[0].wellnessScore;
    const prevScores = wh.slice(1, 6).map(h => h.wellnessScore);
    if (prevScores.length > 0) {
      const maxPrev = Math.max(...prevScores);
      if (maxPrev - latestScore >= 10) {
        decliningWellness = true;
      }
    }
  }

  if (decliningWellness) {
    wellnessTrendContribution = clinicalWeights.wellnessTrend;
    contributingFactors.push("Declining wellness score trajectory.");
  }

  // D. compliance (up to clinicalWeights.compliance points)
  let complianceContribution = 0;
  const overallCompliance = resident.careCompliance?.overall ?? 100;
  if (overallCompliance < 60) {
    complianceContribution += Math.round(clinicalWeights.compliance / 2);
    contributingFactors.push(`Critical low compliance: ${overallCompliance}%.`);
  } else if (overallCompliance < 80) {
    complianceContribution += Math.round(clinicalWeights.compliance / 4);
    contributingFactors.push(`Sub-optimal compliance: ${overallCompliance}%.`);
  }

  if (overallCompliance < 85) {
    complianceContribution += Math.round(clinicalWeights.compliance / 2);
    contributingFactors.push("Deterioration in care plan compliance.");
  }

  // E. missedMedication (up to clinicalWeights.missedMedication points)
  let missedMedicationContribution = 0;
  const meds = resident.carePlan?.medications || [];
  const missedMedsCount = meds.filter(t => t.status === "MISSED").length;
  if (missedMedsCount >= 3) {
    missedMedicationContribution = clinicalWeights.missedMedication;
    contributingFactors.push(`Repeated missed medications (${missedMedsCount} misses).`);
  } else if (missedMedsCount >= 1) {
    missedMedicationContribution = Math.round(clinicalWeights.missedMedication * 8 / 15);
    contributingFactors.push(`Missed medication task recorded (${missedMedsCount} miss).`);
  }

  // F. monitoring (up to clinicalWeights.monitoring points)
  let monitoringContribution = 0;
  const dailyLogs = resident.dailyLogs || [];
  const recentLogs = dailyLogs.slice(0, 3);
  if (recentLogs.length > 0) {
    const avgSleep = recentLogs.reduce((sum, l) => sum + (parseFloat(l.sleepHours) || 8), 0) / recentLogs.length;
    if (avgSleep < 5) {
      monitoringContribution += Math.round(clinicalWeights.monitoring / 2);
      contributingFactors.push(`Sleep deprivation detected (average ${avgSleep.toFixed(1)}h).`);
    }

    const badMoodCount = recentLogs.filter(l => ["Depressed", "Anxious", "Agitated"].includes(l.mood)).length;
    if (badMoodCount >= 2) {
      monitoringContribution += Math.round(clinicalWeights.monitoring / 2);
      contributingFactors.push("Unstable mood patterns recorded.");
    }
  }

  // 3. Compute Risk Score & Analytics Risk Level
  const riskScore = Math.min(100, 
    clinicalContribution + 
    vitalsTrendContribution + 
    wellnessTrendContribution + 
    complianceContribution + 
    missedMedicationContribution + 
    monitoringContribution
  );

  let analyticsRiskLevel = "Low";
  if (riskScore > 75) analyticsRiskLevel = "Critical";
  else if (riskScore > 50) analyticsRiskLevel = "High";
  else if (riskScore > 25) analyticsRiskLevel = "Medium";

  // 4. Compute Composite Overall Risk Level
  const levelPriority = { Low: 1, Medium: 2, High: 3, Critical: 4 };
  const overallRiskLevel = levelPriority[clinicalRiskLevel] >= levelPriority[analyticsRiskLevel]
    ? clinicalRiskLevel
    : analyticsRiskLevel;

  return {
    clinicalRiskLevel,
    analyticsRiskLevel,
    overallRiskLevel,
    riskScore,
    contributions: {
      clinical: clinicalContribution,
      vitalsTrend: vitalsTrendContribution,
      wellnessTrend: wellnessTrendContribution,
      compliance: complianceContribution,
      missedMedication: missedMedicationContribution,
      monitoring: monitoringContribution
    },
    contributingFactors,
    clinicalRiskFactors
  };
}

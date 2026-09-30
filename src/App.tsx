/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OverviewScreen } from './components/OverviewScreen';
import { NewAuditWizard } from './components/NewAuditWizard';
import { RunningAuditScreen } from './components/RunningAuditScreen';
import { AuditReportScreen } from './components/AuditReportScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { MethodologyScreen } from './components/MethodologyScreen';
import { AboutScreen } from './components/AboutScreen';
import { ReportModal } from './components/ReportModal';
import { ProfileModal } from './components/ProfileModal';
import {
  INITIAL_AUDIT_RECORD,
  SADIQ_AUDIT_RECORD,
  ELENA_AUDIT_RECORD,
  PAST_AUDITS
} from './data/mockData';
import { AuditRecord, CounterfactualVariant, ExtractedFeatures, JobTarget, TabType } from './types';
import { computeAuditScoring } from './utils/scoringEngine';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [activeAudit, setActiveAudit] = useState<AuditRecord>(INITIAL_AUDIT_RECORD);
  const [auditList, setAuditList] = useState<AuditRecord[]>(PAST_AUDITS);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [calibrationMode, setCalibrationMode] = useState('CALIBRATED');
  const [selectedCandidateKey, setSelectedCandidateKey] = useState<'amara' | 'sadiq' | 'elena'>('amara');

  // Launch audit directly for a specific candidate
  const handleStartCandidateAudit = (candidateKey: 'amara' | 'sadiq' | 'elena') => {
    let targetAudit: AuditRecord;
    if (candidateKey === 'sadiq') {
      targetAudit = SADIQ_AUDIT_RECORD;
    } else if (candidateKey === 'elena') {
      targetAudit = ELENA_AUDIT_RECORD;
    } else {
      targetAudit = INITIAL_AUDIT_RECORD;
    }

    setActiveAudit(targetAudit);
    setSelectedCandidateKey(candidateKey);
    // Add to audit history if not already present
    setAuditList((prev) => [targetAudit, ...prev.filter((a) => a.id !== targetAudit.id)]);
    setCurrentTab('running');
  };

  // Open wizard pre-configured with candidate
  const handleOpenWizardWithCandidate = (candidateKey: 'amara' | 'sadiq' | 'elena') => {
    setSelectedCandidateKey(candidateKey);
    setCurrentTab('new-audit');
  };

  // Launch new audit configured from wizard
  const handleRunConfiguredAudit = (config: {
    features: ExtractedFeatures;
    jobTarget: JobTarget;
    variants: CounterfactualVariant[];
  }) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const computed = computeAuditScoring(config.features, config.jobTarget, config.variants);

    const newRecord: AuditRecord = {
      id: `AUD-2026-0928-${randomSuffix.toString().slice(0, 2)}`,
      candidateName: config.features.name,
      targetRole: config.jobTarget.title,
      company: config.jobTarget.company,
      date: 'Just now',
      observedSpread: computed.observedSpread,
      avgDeltaPenalty: computed.avgDeltaPenalty,
      originalScore: computed.originalScore,
      topScore: computed.topScore,
      modelAGap: computed.modelAGap,
      modelBGap: computed.modelBGap,
      variantsCount: config.variants.filter((v) => v.active && !v.isBaseline).length,
      confidence: 'Moderate (N=12)',
      status: 'Completed',
      elapsedSeconds: computed.elapsedSeconds,
      features: config.features,
      jobTarget: config.jobTarget,
      variants: computed.variants,
      recommendations: computed.recommendations,
      sensitivityAttribution: computed.sensitivityAttribution
    };

    setActiveAudit(newRecord);
    setAuditList((prev) => [newRecord, ...prev.filter((a) => a.id !== newRecord.id)]);
    setCurrentTab('running');
  };

  const handleAuditExecutionComplete = () => {
    setCurrentTab('report');
  };

  const handleSelectHistoryAudit = (audit: AuditRecord) => {
    setActiveAudit(audit);
    setCurrentTab('report');
  };

  const handleToggleCalibration = () => {
    setCalibrationMode((prev) => (prev === 'CALIBRATED' ? 'MONTE-CARLO' : 'CALIBRATED'));
  };

  const handleResetSession = () => {
    setActiveAudit(INITIAL_AUDIT_RECORD);
    setAuditList(PAST_AUDITS);
    setSelectedCandidateKey('amara');
    setCurrentTab('overview');
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-['Inter'] selection:bg-[#dce1ff]">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => setCurrentTab(tab)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        calibrationMode={calibrationMode}
        onToggleCalibration={handleToggleCalibration}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-16 transition-all duration-200">
        {currentTab === 'overview' && (
          <OverviewScreen
            onStartDemo={() => handleStartCandidateAudit('amara')}
            onStartCandidate={handleStartCandidateAudit}
            onConfigureCandidate={handleOpenWizardWithCandidate}
            onStartCustom={() => {
              setSelectedCandidateKey('amara');
              setCurrentTab('new-audit');
            }}
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'new-audit' && (
          <NewAuditWizard
            initialCandidate={selectedCandidateKey}
            onRunAudit={handleRunConfiguredAudit}
          />
        )}

        {currentTab === 'running' && (
          <RunningAuditScreen
            onComplete={handleAuditExecutionComplete}
            auditId={activeAudit.id}
            candidateName={activeAudit.candidateName}
          />
        )}

        {currentTab === 'report' && (
          <AuditReportScreen
            audit={activeAudit}
            onOpenReportModal={() => setIsReportModalOpen(true)}
            onRecheck={() => setCurrentTab('running')}
          />
        )}

        {currentTab === 'history' && (
          <HistoryScreen
            audits={auditList}
            onSelectAudit={handleSelectHistoryAudit}
            onNewAudit={() => setCurrentTab('new-audit')}
          />
        )}

        {currentTab === 'methodology' && <MethodologyScreen />}

        {currentTab === 'about' && <AboutScreen />}
      </main>

      {/* Persistent Bottom Tab Navigation (hidden on desktop and on running audit screen) */}
      {currentTab !== 'running' && (
        <BottomNav currentTab={currentTab} onNavigate={(tab) => setCurrentTab(tab)} />
      )}

      {/* Printable / Downloadable Research PDF Report Modal */}
      <ReportModal
        audit={activeAudit}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Auditor Session & Calibration Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        calibrationMode={calibrationMode}
        onToggleCalibration={handleToggleCalibration}
        onResetSession={handleResetSession}
      />
    </div>
  );
}

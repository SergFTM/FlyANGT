/**
 * Internationalization Configuration
 *
 * Language settings and translation dictionary.
 * Minimal translation map for routes and common UI.
 */

export type Locale = 'en' | 'ru';

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
}

export const locales: LocaleConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
];

/**
 * Translation dictionary keys
 */
export type TranslationKey =
  // Navigation
  | 'nav.home'
  | 'nav.ecosystem'
  | 'nav.token'
  | 'nav.platform'
  | 'nav.partners'
  | 'nav.investors'
  | 'nav.customers'
  | 'nav.dashboard'
  | 'nav.presale'
  | 'nav.trust'
  // Dashboard navigation
  | 'dash.overview'
  | 'dash.documents'
  | 'dash.requests'
  | 'dash.support'
  | 'dash.settings'
  // Dashboard access denied
  | 'dash.accessDenied.title'
  | 'dash.accessDenied.text'
  // Dashboard placeholder
  | 'dash.placeholder.title'
  | 'dash.placeholder.text'
  // CTAs
  | 'cta.primary'
  | 'cta.secondary'
  | 'cta.learnMore'
  // Footer
  | 'footer.disclaimer'
  | 'footer.company'
  // Common
  | 'common.comingSoon'
  | 'common.moduleDisabled'
  | 'common.role'
  // Trust Center - Categories
  | 'trust.category.legal'
  | 'trust.category.legal.desc'
  | 'trust.category.manuals'
  | 'trust.category.manuals.desc'
  | 'trust.category.maintenance'
  | 'trust.category.maintenance.desc'
  | 'trust.category.sales'
  | 'trust.category.sales.desc'
  | 'trust.category.quality'
  | 'trust.category.quality.desc'
  | 'trust.category.forms'
  | 'trust.category.forms.desc'
  | 'trust.category.policies'
  | 'trust.category.policies.desc'
  // Trust Center - Documents
  | 'trust.doc.terms.title'
  | 'trust.doc.terms.desc'
  | 'trust.doc.privacy.title'
  | 'trust.doc.privacy.desc'
  | 'trust.doc.platform-manual.title'
  | 'trust.doc.platform-manual.desc'
  | 'trust.doc.maintenance-guide.title'
  | 'trust.doc.maintenance-guide.desc'
  | 'trust.doc.sales-kit.title'
  | 'trust.doc.sales-kit.desc'
  | 'trust.doc.qa-standards.title'
  | 'trust.doc.qa-standards.desc'
  | 'trust.doc.partner-form.title'
  | 'trust.doc.partner-form.desc'
  | 'trust.doc.data-retention.title'
  | 'trust.doc.data-retention.desc'
  | 'trust.doc.flight-ops.title'
  | 'trust.doc.flight-ops.desc'
  | 'trust.doc.compliance.title'
  | 'trust.doc.compliance.desc'
  | 'trust.doc.investor-deck.title'
  | 'trust.doc.investor-deck.desc'
  | 'trust.doc.security.title'
  | 'trust.doc.security.desc'
  | 'trust.doc.whitepaper.title'
  | 'trust.doc.whitepaper.desc'
  // Trust Center - UI
  | 'trust.title'
  | 'trust.subtitle'
  | 'trust.search.placeholder'
  | 'trust.filter.all'
  | 'trust.filter.category'
  | 'trust.filter.type'
  | 'trust.sort.newest'
  | 'trust.sort.oldest'
  | 'trust.sort.name'
  | 'trust.noResults'
  | 'trust.docCount'
  | 'trust.version'
  | 'trust.lastUpdated'
  | 'trust.download'
  | 'trust.openLink'
  | 'trust.backToCatalog'
  | 'trust.keyPoints'
  | 'trust.restricted'
  // Presale - Weeks
  | 'presale.week.1'
  | 'presale.week.2'
  | 'presale.week.3'
  | 'presale.week.4'
  | 'presale.week.5'
  | 'presale.week.6'
  | 'presale.week.7'
  | 'presale.week.8'
  | 'presale.week.9'
  | 'presale.week.10'
  // Presale - Bonuses
  | 'presale.bonus.early'
  // Presale - Status
  | 'presale.status.upcoming'
  | 'presale.status.active'
  | 'presale.status.completed'
  // Configurator - Navigation
  | 'nav.configurator'
  // Configurator - Groups
  | 'cfg.group.model'
  | 'cfg.group.model.desc'
  | 'cfg.group.exterior'
  | 'cfg.group.exterior.desc'
  | 'cfg.group.interior'
  | 'cfg.group.interior.desc'
  | 'cfg.group.avionics'
  | 'cfg.group.avionics.desc'
  | 'cfg.group.safety'
  | 'cfg.group.safety.desc'
  | 'cfg.group.packages'
  | 'cfg.group.packages.desc'
  // Configurator - Model options
  | 'cfg.opt.model.light'
  | 'cfg.opt.model.light.desc'
  | 'cfg.opt.model.standard'
  | 'cfg.opt.model.standard.desc'
  | 'cfg.opt.model.performance'
  | 'cfg.opt.model.performance.desc'
  | 'cfg.opt.model.executive'
  | 'cfg.opt.model.executive.desc'
  // Configurator - Exterior options
  | 'cfg.opt.ext.white'
  | 'cfg.opt.ext.silver'
  | 'cfg.opt.ext.blue'
  | 'cfg.opt.ext.black'
  | 'cfg.opt.ext.custom'
  | 'cfg.opt.ext.custom.desc'
  // Configurator - Interior options
  | 'cfg.opt.int.standard'
  | 'cfg.opt.int.standard.desc'
  | 'cfg.opt.int.comfort'
  | 'cfg.opt.int.comfort.desc'
  | 'cfg.opt.int.executive'
  | 'cfg.opt.int.executive.desc'
  | 'cfg.opt.int.luxury'
  | 'cfg.opt.int.luxury.desc'
  // Configurator - Avionics options
  | 'cfg.opt.avio.basic'
  | 'cfg.opt.avio.basic.desc'
  | 'cfg.opt.avio.advanced'
  | 'cfg.opt.avio.advanced.desc'
  | 'cfg.opt.avio.premium'
  | 'cfg.opt.avio.premium.desc'
  | 'cfg.opt.avio.integrated'
  | 'cfg.opt.avio.integrated.desc'
  // Configurator - Safety options
  | 'cfg.opt.safe.parachute'
  | 'cfg.opt.safe.parachute.desc'
  | 'cfg.opt.safe.tracker'
  | 'cfg.opt.safe.tracker.desc'
  | 'cfg.opt.safe.beacon'
  | 'cfg.opt.safe.beacon.desc'
  | 'cfg.opt.safe.oxygen'
  | 'cfg.opt.safe.oxygen.desc'
  | 'cfg.opt.safe.fire'
  | 'cfg.opt.safe.fire.desc'
  // Configurator - Package options
  | 'cfg.opt.pkg.training'
  | 'cfg.opt.pkg.training.desc'
  | 'cfg.opt.pkg.maintenance'
  | 'cfg.opt.pkg.maintenance.desc'
  | 'cfg.opt.pkg.warranty'
  | 'cfg.opt.pkg.warranty.desc'
  | 'cfg.opt.pkg.delivery'
  | 'cfg.opt.pkg.delivery.desc'
  | 'cfg.opt.pkg.insurance'
  | 'cfg.opt.pkg.insurance.desc'
  | 'cfg.opt.pkg.hangar'
  | 'cfg.opt.pkg.hangar.desc'
  // Configurator - Pricing
  | 'cfg.pricing.note'
  // Workflow - Navigation
  | 'nav.workflow'
  | 'dash.workflow'
  // Workflow - Steps
  | 'wf.step.configure.title'
  | 'wf.step.configure.summary'
  | 'wf.step.configure.check.1'
  | 'wf.step.configure.check.2'
  | 'wf.step.configure.check.3'
  | 'wf.step.configure.check.4'
  | 'wf.step.configure.check.5'
  | 'wf.step.qualification.title'
  | 'wf.step.qualification.summary'
  | 'wf.step.qualification.check.1'
  | 'wf.step.qualification.check.2'
  | 'wf.step.qualification.check.3'
  | 'wf.step.qualification.check.4'
  | 'wf.step.qualification.check.5'
  | 'wf.step.qualification.check.6'
  | 'wf.step.contract.title'
  | 'wf.step.contract.summary'
  | 'wf.step.contract.check.1'
  | 'wf.step.contract.check.2'
  | 'wf.step.contract.check.3'
  | 'wf.step.contract.check.4'
  | 'wf.step.build.title'
  | 'wf.step.build.summary'
  | 'wf.step.build.check.1'
  | 'wf.step.build.check.2'
  | 'wf.step.build.check.3'
  | 'wf.step.build.check.4'
  | 'wf.step.build.check.5'
  | 'wf.step.build.check.6'
  | 'wf.step.build.check.7'
  | 'wf.step.qa.title'
  | 'wf.step.qa.summary'
  | 'wf.step.qa.check.1'
  | 'wf.step.qa.check.2'
  | 'wf.step.qa.check.3'
  | 'wf.step.qa.check.4'
  | 'wf.step.qa.check.5'
  | 'wf.step.training.title'
  | 'wf.step.training.summary'
  | 'wf.step.training.check.1'
  | 'wf.step.training.check.2'
  | 'wf.step.training.check.3'
  | 'wf.step.training.check.4'
  | 'wf.step.training.check.5'
  | 'wf.step.training.check.6'
  | 'wf.step.delivery.title'
  | 'wf.step.delivery.summary'
  | 'wf.step.delivery.check.1'
  | 'wf.step.delivery.check.2'
  | 'wf.step.delivery.check.3'
  | 'wf.step.delivery.check.4'
  | 'wf.step.delivery.check.5'
  | 'wf.step.service.title'
  | 'wf.step.service.summary'
  | 'wf.step.service.check.1'
  | 'wf.step.service.check.2'
  | 'wf.step.service.check.3'
  | 'wf.step.service.check.4'
  // Workflow - Document labels
  | 'wf.doc.terms'
  | 'wf.doc.privacy'
  | 'wf.doc.application'
  | 'wf.doc.compliance'
  | 'wf.doc.dataRetention'
  | 'wf.doc.qaStandards'
  | 'wf.doc.flightOps'
  | 'wf.doc.platformManual'
  | 'wf.doc.security'
  | 'wf.doc.maintenance'
  // Workflow - UI labels
  | 'wf.progress'
  | 'wf.currentStep'
  | 'wf.stepOf'
  // Request - Status
  | 'req.status.draft'
  | 'req.status.in_review'
  | 'req.status.scheduled'
  | 'req.status.in_progress'
  | 'req.status.completed'
  // Request - Stub titles
  | 'req.stub.config1.title'
  | 'req.stub.qualification1.title'
  | 'req.stub.build1.title'
  | 'req.stub.training1.title'
  | 'req.stub.completed1.title'
  // Request - UI labels
  | 'req.noRequests'
  | 'req.viewWorkflow'
  | 'req.openConfigurator'
  | 'req.openPresale'
  // Token - Sections
  | 'token.section.overview.title'
  | 'token.section.overview.text'
  | 'token.section.overview.bullet.1'
  | 'token.section.overview.bullet.2'
  | 'token.section.overview.bullet.3'
  | 'token.section.why.title'
  | 'token.section.why.text'
  | 'token.section.why.bullet.1'
  | 'token.section.why.bullet.2'
  | 'token.section.why.bullet.3'
  | 'token.section.why.bullet.4'
  | 'token.section.utility.title'
  | 'token.section.utility.text'
  | 'token.section.utility.bullet.1'
  | 'token.section.utility.bullet.2'
  | 'token.section.utility.bullet.3'
  | 'token.section.utility.bullet.4'
  | 'token.section.interaction.title'
  | 'token.section.interaction.text'
  | 'token.section.interaction.bullet.1'
  | 'token.section.interaction.bullet.2'
  | 'token.section.interaction.bullet.3'
  | 'token.section.transparency.title'
  | 'token.section.transparency.text'
  | 'token.section.transparency.bullet.1'
  | 'token.section.transparency.bullet.2'
  | 'token.section.transparency.bullet.3'
  | 'token.section.whitepaper.title'
  | 'token.section.whitepaper.text'
  | 'token.section.risks.title'
  | 'token.section.risks.text'
  | 'token.section.risks.bullet.1'
  | 'token.section.risks.bullet.2'
  | 'token.section.risks.bullet.3'
  | 'token.section.risks.bullet.4'
  // Token - CTAs
  | 'token.cta.reviewFramework'
  | 'token.cta.openWhitepaper'
  | 'token.cta.exploreParticipation'
  // Token - UI
  | 'token.readInTrust'
  | 'token.riskDisclosure'
  // Partner - Types
  | 'partner.type.dealer'
  | 'partner.type.mro'
  | 'partner.type.hangar'
  | 'partner.type.flight_school'
  | 'partner.type.marketing_pr'
  | 'partner.type.payments'
  | 'partner.type.crm_support'
  | 'partner.type.market_making'
  | 'partner.type.integrator'
  // Partner - Regions
  | 'partner.region.cyprus'
  | 'partner.region.eu'
  | 'partner.region.mena'
  | 'partner.region.global'
  // Partner - Status
  | 'partner.status.planned'
  | 'partner.status.active'
  | 'partner.status.pilot'
  // Partner - Services
  | 'partner.service.sales'
  | 'partner.service.build_assist'
  | 'partner.service.maintenance'
  | 'partner.service.hangar_storage'
  | 'partner.service.training'
  | 'partner.service.payments'
  | 'partner.service.crm'
  | 'partner.service.support'
  | 'partner.service.liquidity'
  | 'partner.service.compliance'
  // Partner - Group labels
  | 'partner.group.offline'
  | 'partner.group.digital'
  // Partner - Directory UI
  | 'partner.filter.all'
  | 'partner.filter.type'
  | 'partner.filter.region'
  | 'partner.filter.services'
  // Partner - Seed data (headlines/descriptions)
  | 'partner.aero_cyprus.headline'
  | 'partner.aero_cyprus.description'
  | 'partner.aero_cyprus.highlight.1'
  | 'partner.aero_cyprus.highlight.2'
  | 'partner.skybridge.headline'
  | 'partner.skybridge.description'
  | 'partner.skybridge.highlight.1'
  | 'partner.gulf_aviation.headline'
  | 'partner.gulf_aviation.description'
  | 'partner.cyprus_aircraft.headline'
  | 'partner.cyprus_aircraft.description'
  | 'partner.cyprus_aircraft.highlight.1'
  | 'partner.cyprus_aircraft.highlight.2'
  | 'partner.eurotech.headline'
  | 'partner.eurotech.description'
  | 'partner.larnaca_hangar.headline'
  | 'partner.larnaca_hangar.description'
  | 'partner.larnaca_hangar.highlight.1'
  | 'partner.dubai_storage.headline'
  | 'partner.dubai_storage.description'
  | 'partner.med_flight.headline'
  | 'partner.med_flight.description'
  | 'partner.med_flight.highlight.1'
  | 'partner.med_flight.highlight.2'
  | 'partner.eu_pilot.headline'
  | 'partner.eu_pilot.description'
  | 'partner.aviation_media.headline'
  | 'partner.aviation_media.description'
  | 'partner.flyfi.headline'
  | 'partner.flyfi.description'
  | 'partner.flyfi.highlight.1'
  | 'partner.aerocrm.headline'
  | 'partner.aerocrm.description'
  | 'partner.liquidity.headline'
  | 'partner.liquidity.description'
  | 'partner.skyconnect.headline'
  | 'partner.skyconnect.description'
  | 'partner.mena_tech.headline'
  | 'partner.mena_tech.description'
  // Partner - Filter UI (additional)
  | 'partner.filter.allTypes'
  | 'partner.filter.allRegions'
  | 'partner.viewProfile'
  // Investors - Sections
  | 'investors.section.thesis.title'
  | 'investors.section.thesis.text'
  | 'investors.section.thesis.bullet.1'
  | 'investors.section.thesis.bullet.2'
  | 'investors.section.thesis.bullet.3'
  | 'investors.section.market.title'
  | 'investors.section.market.text'
  | 'investors.section.market.bullet.1'
  | 'investors.section.market.bullet.2'
  | 'investors.section.market.bullet.3'
  | 'investors.section.market.bullet.4'
  | 'investors.section.stack.title'
  | 'investors.section.stack.text'
  | 'investors.section.stack.bullet.1'
  | 'investors.section.stack.bullet.2'
  | 'investors.section.stack.bullet.3'
  | 'investors.section.stack.bullet.4'
  | 'investors.section.revenue.title'
  | 'investors.section.revenue.text'
  | 'investors.section.revenue.bullet.1'
  | 'investors.section.revenue.bullet.2'
  | 'investors.section.revenue.bullet.3'
  | 'investors.section.revenue.bullet.4'
  | 'investors.section.revenue.bullet.5'
  | 'investors.section.unit_economics.title'
  | 'investors.section.unit_economics.text'
  | 'investors.section.unit_economics.bullet.1'
  | 'investors.section.unit_economics.bullet.2'
  | 'investors.section.unit_economics.bullet.3'
  | 'investors.section.unit_economics.bullet.4'
  | 'investors.section.unit_economics.bullet.5'
  | 'investors.section.presale_plan.title'
  | 'investors.section.presale_plan.text'
  | 'investors.section.presale_plan.bullet.1'
  | 'investors.section.presale_plan.bullet.2'
  | 'investors.section.presale_plan.bullet.3'
  | 'investors.section.presale_plan.bullet.4'
  | 'investors.section.presale_plan.bullet.5'
  | 'investors.section.presale_plan.cta'
  | 'investors.section.token_role.title'
  | 'investors.section.token_role.text'
  | 'investors.section.token_role.bullet.1'
  | 'investors.section.token_role.bullet.2'
  | 'investors.section.token_role.bullet.3'
  | 'investors.section.token_role.cta'
  | 'investors.section.trust.title'
  | 'investors.section.trust.text'
  | 'investors.section.trust.cta'
  | 'investors.section.cta.title'
  | 'investors.section.cta.text'
  // Investors - Metrics
  | 'investors.metric.cac.label'
  | 'investors.metric.cac.note'
  | 'investors.metric.conversion.label'
  | 'investors.metric.conversion.note'
  | 'investors.metric.margin.label'
  | 'investors.metric.margin.note'
  | 'investors.metric.service_utilization.label'
  | 'investors.metric.service_utilization.note'
  | 'investors.metric.ltv.label'
  | 'investors.metric.ltv.note'
  | 'investors.metric.build_assist_capacity.label'
  | 'investors.metric.build_assist_capacity.note'
  | 'investors.metric.nps.label'
  | 'investors.metric.nps.note'
  | 'investors.metric.warranty_claims.label'
  | 'investors.metric.warranty_claims.note'
  | 'investors.metric.training_attach.label'
  | 'investors.metric.training_attach.note'
  | 'investors.metric.token_velocity.label'
  | 'investors.metric.token_velocity.note'
  | 'investors.metric.partner_retention.label'
  | 'investors.metric.partner_retention.note'
  | 'investors.metric.platform_gmv.label'
  | 'investors.metric.platform_gmv.note'
  // Customers - Sections
  | 'customers.section.what_you_get.title'
  | 'customers.section.what_you_get.text'
  | 'customers.section.what_you_get.bullet.1'
  | 'customers.section.what_you_get.bullet.2'
  | 'customers.section.what_you_get.bullet.3'
  | 'customers.section.what_you_get.bullet.4'
  | 'customers.section.what_you_get.bullet.5'
  | 'customers.section.why_owner_assisted.title'
  | 'customers.section.why_owner_assisted.text'
  | 'customers.section.why_owner_assisted.bullet.1'
  | 'customers.section.why_owner_assisted.bullet.2'
  | 'customers.section.why_owner_assisted.bullet.3'
  | 'customers.section.journey.title'
  | 'customers.section.journey.text'
  | 'customers.section.service.title'
  | 'customers.section.service.text'
  | 'customers.section.service.bullet.1'
  | 'customers.section.service.bullet.2'
  | 'customers.section.service.bullet.3'
  | 'customers.section.service.bullet.4'
  | 'customers.section.service.bullet.5'
  | 'customers.section.training.title'
  | 'customers.section.training.text'
  | 'customers.section.training.bullet.1'
  | 'customers.section.training.bullet.2'
  | 'customers.section.training.bullet.3'
  | 'customers.section.training.bullet.4'
  | 'customers.section.ownership.title'
  | 'customers.section.ownership.text'
  | 'customers.section.digital_cabinet.title'
  | 'customers.section.digital_cabinet.text'
  | 'customers.section.digital_cabinet.bullet.1'
  | 'customers.section.digital_cabinet.bullet.2'
  | 'customers.section.digital_cabinet.bullet.3'
  | 'customers.section.digital_cabinet.bullet.4'
  | 'customers.section.request_docs.title'
  | 'customers.section.request_docs.text'
  | 'customers.section.cta.title'
  | 'customers.section.cta.text'
  // Home page
  | 'home.paths.title'
  | 'home.paths.text'
  | 'home.modules.title'
  | 'home.modules.text'
  | 'home.trust.title'
  | 'home.trust.text'
  | 'home.workflow.title'
  | 'home.workflow.text'
  | 'home.quick.title'
  | 'home.quick.text'
  | 'home.updates.title'
  | 'home.updates.text'
  // Generic UI labels
  | 'ui.back'
  | 'ui.open'
  | 'ui.search'
  | 'ui.filter'
  | 'ui.reset'
  | 'ui.save'
  | 'ui.submit'
  | 'ui.cancel'
  | 'ui.close'
  | 'ui.loading'
  | 'ui.error'
  | 'ui.success'
  | 'ui.viewAll'
  | 'ui.showMore'
  | 'ui.showLess'
  // Release checklist (dev tool)
  | 'nav.release'
  | 'release.title'
  | 'release.subtitle'
  | 'release.filters.status'
  | 'release.filters.priority'
  | 'release.filters.module'
  | 'release.status.todo'
  | 'release.status.in_progress'
  | 'release.status.blocked'
  | 'release.status.done'
  | 'release.status.na'
  | 'release.priority.p0'
  | 'release.priority.p1'
  | 'release.priority.p2'
  | 'release.actions.reset'
  | 'release.actions.export'
  | 'release.actions.collapseAll'
  | 'release.actions.expandAll'
  | 'release.notes.placeholder'
  | 'release.empty.title'
  | 'release.empty.text'
  | 'release.progress.label'
  | 'release.progress.complete'
  // Release module titles
  | 'release.module.home.title'
  | 'release.module.trust.title'
  | 'release.module.presale.title'
  | 'release.module.configurator.title'
  | 'release.module.workflow.title'
  | 'release.module.token.title'
  | 'release.module.partners.title'
  | 'release.module.investors.title'
  | 'release.module.customers.title'
  | 'release.module.dashboard.title'
  | 'release.module.i18n.title'
  | 'release.module.ux.title'
  // Release check titles - Home
  | 'release.check.home-no-hardcoded.title'
  | 'release.check.home-i18n-coverage.title'
  | 'release.check.home-nav-links.title'
  | 'release.check.home-responsive.title'
  | 'release.check.home-module-cards.title'
  | 'release.check.home-pathway-links.title'
  // Release check titles - Trust
  | 'release.check.trust-no-hardcoded.title'
  | 'release.check.trust-i18n-coverage.title'
  | 'release.check.trust-filter-works.title'
  | 'release.check.trust-search-works.title'
  | 'release.check.trust-empty-state.title'
  | 'release.check.trust-doc-links.title'
  | 'release.check.trust-detail-pages.title'
  | 'release.check.trust-restricted-badge.title'
  // Release check titles - Presale
  | 'release.check.presale-no-hardcoded.title'
  | 'release.check.presale-i18n-coverage.title'
  | 'release.check.presale-disabled-state.title'
  | 'release.check.presale-config-toggle.title'
  | 'release.check.presale-calculator.title'
  | 'release.check.presale-form-validation.title'
  | 'release.check.presale-week-ladder.title'
  // Release check titles - Configurator
  | 'release.check.cfg-no-hardcoded.title'
  | 'release.check.cfg-i18n-coverage.title'
  | 'release.check.cfg-disabled-state.title'
  | 'release.check.cfg-config-toggle.title'
  | 'release.check.cfg-group-nav.title'
  | 'release.check.cfg-option-select.title'
  | 'release.check.cfg-price-calc.title'
  | 'release.check.cfg-summary-panel.title'
  // Release check titles - Workflow
  | 'release.check.wf-no-hardcoded.title'
  | 'release.check.wf-i18n-coverage.title'
  | 'release.check.wf-step-navigation.title'
  | 'release.check.wf-step-detail.title'
  | 'release.check.wf-doc-links.title'
  | 'release.check.wf-progress-display.title'
  | 'release.check.wf-checklist-items.title'
  // Release check titles - Token
  | 'release.check.token-no-hardcoded.title'
  | 'release.check.token-i18n-coverage.title'
  | 'release.check.token-disabled-state.title'
  | 'release.check.token-sections.title'
  | 'release.check.token-risk-disclosure.title'
  | 'release.check.token-cta-links.title'
  // Release check titles - Partners
  | 'release.check.partners-no-hardcoded.title'
  | 'release.check.partners-i18n-coverage.title'
  | 'release.check.partners-filter-works.title'
  | 'release.check.partners-empty-state.title'
  | 'release.check.partners-detail-pages.title'
  | 'release.check.partners-map-display.title'
  | 'release.check.partners-service-chips.title'
  // Release check titles - Investors
  | 'release.check.inv-no-hardcoded.title'
  | 'release.check.inv-i18n-coverage.title'
  | 'release.check.inv-sections.title'
  | 'release.check.inv-metrics-display.title'
  | 'release.check.inv-cta-links.title'
  | 'release.check.inv-final-cta.title'
  // Release check titles - Customers
  | 'release.check.cust-no-hardcoded.title'
  | 'release.check.cust-i18n-coverage.title'
  | 'release.check.cust-sections.title'
  | 'release.check.cust-journey-display.title'
  | 'release.check.cust-cta-links.title'
  | 'release.check.cust-final-cta.title'
  // Release check titles - Dashboard
  | 'release.check.dash-no-hardcoded.title'
  | 'release.check.dash-i18n-coverage.title'
  | 'release.check.dash-nav-works.title'
  | 'release.check.dash-role-guard.title'
  | 'release.check.dash-placeholder-pages.title'
  | 'release.check.dash-requests-list.title'
  | 'release.check.dash-localStorage.title'
  // Release check titles - I18n
  | 'release.check.i18n-en-coverage.title'
  | 'release.check.i18n-ru-coverage.title'
  | 'release.check.i18n-lang-switch.title'
  | 'release.check.i18n-url-param.title'
  | 'release.check.i18n-fallback.title'
  | 'release.check.i18n-audit-hidden.title'
  // Release check titles - UX
  | 'release.check.ux-design-tokens.title'
  | 'release.check.ux-ui-primitives.title'
  | 'release.check.ux-empty-states.title'
  | 'release.check.ux-loading-states.title'
  | 'release.check.ux-responsive.title'
  | 'release.check.ux-dev-routes-hidden.title'
  | 'release.check.ux-no-api-calls.title'
  | 'release.check.ux-config-driven.title'
  // Prelaunch
  | 'prelaunch.banner'
  | 'prelaunch.draftsBlockedTitle'
  | 'prelaunch.draftsBlockedText'
  // Snapshot
  | 'snapshot.title'
  | 'snapshot.subtitle'
  | 'snapshot.actions.download'
  | 'snapshot.actions.copy'
  | 'snapshot.notice.devOnly'
  | 'snapshot.disabled'
  | 'snapshot.copied'
  | 'snapshot.summary.mode'
  | 'snapshot.summary.configs'
  | 'snapshot.summary.pages'
  | 'snapshot.summary.generated'
  // Export Center
  | 'export.title'
  | 'export.subtitle'
  | 'export.artifact.snapshot.title'
  | 'export.artifact.snapshot.text'
  | 'export.artifact.release.title'
  | 'export.artifact.release.text'
  | 'export.artifact.i18n.title'
  | 'export.artifact.i18n.text'
  | 'export.artifact.smoke.title'
  | 'export.artifact.smoke.text'
  | 'export.artifact.bundle.title'
  | 'export.artifact.bundle.text'
  | 'export.actions.download'
  | 'export.actions.copy'
  | 'export.actions.copyDone'
  | 'export.notice.devOnly'
  | 'export.smoke.openAll'
  // Smoke test keys
  | 'smoke.title'
  | 'smoke.subtitle'
  | 'smoke.group.publicCore'
  | 'smoke.group.trustCenter'
  | 'smoke.group.presale'
  | 'smoke.group.configurator'
  | 'smoke.group.token'
  | 'smoke.group.partners'
  | 'smoke.group.investors'
  | 'smoke.group.customers'
  | 'smoke.group.workflow'
  | 'smoke.group.dashboardBasic'
  | 'smoke.group.devTools'
  | 'smoke.status.untested'
  | 'smoke.status.pass'
  | 'smoke.status.fail'
  | 'smoke.status.skip'
  | 'smoke.actions.markPass'
  | 'smoke.actions.markFail'
  | 'smoke.actions.markSkip'
  | 'smoke.actions.reset'
  | 'smoke.actions.resetAll'
  | 'smoke.actions.export'
  | 'smoke.actions.openRoute'
  | 'smoke.summary.total'
  | 'smoke.summary.passed'
  | 'smoke.summary.failed'
  | 'smoke.summary.skipped'
  | 'smoke.summary.untested'
  | 'smoke.notice.devOnly'
  | 'smoke.notes.placeholder'
  // Gate keys
  | 'gate.title'
  | 'gate.subtitle'
  | 'gate.summary.overall'
  | 'gate.summary.releaseP0'
  | 'gate.summary.smokeP0'
  | 'gate.summary.i18nMissing'
  | 'gate.summary.devTools'
  | 'gate.actions.openRelease'
  | 'gate.actions.openSmoke'
  | 'gate.actions.openExport'
  | 'gate.actions.openSnapshot'
  | 'gate.actions.openI18n'
  | 'gate.banner.message'
  | 'gate.status.green'
  | 'gate.status.yellow'
  | 'gate.status.red'
  | 'gate.notice.devOnly'
  // RC keys
  | 'rc.title'
  | 'rc.subtitle'
  | 'rc.notice.devOnly'
  | 'rc.actions.create'
  | 'rc.actions.delete'
  | 'rc.actions.select'
  | 'rc.actions.unselect'
  | 'rc.actions.download'
  | 'rc.actions.copy'
  | 'rc.actions.copyDone'
  | 'rc.actions.openGate'
  | 'rc.actions.openExport'
  | 'rc.actions.openRelease'
  | 'rc.actions.openSmoke'
  | 'rc.list.title'
  | 'rc.list.empty.title'
  | 'rc.list.empty.text'
  | 'rc.detail.title'
  | 'rc.fields.id'
  | 'rc.fields.createdAt'
  | 'rc.fields.status'
  | 'rc.fields.selected'
  | 'rc.status.green'
  | 'rc.status.yellow'
  | 'rc.status.red'
  | 'rc.artifact.snapshot'
  | 'rc.artifact.bundle'
  | 'rc.artifact.release'
  | 'rc.artifact.smoke'
  | 'rc.artifact.gate'
  | 'rc.confirmDelete.title'
  | 'rc.confirmDelete.text'
  // RC Compare keys
  | 'rcCompare.title'
  | 'rcCompare.subtitle'
  | 'rcCompare.notice.devOnly'
  | 'rcCompare.select.a'
  | 'rcCompare.select.b'
  | 'rcCompare.actions.swap'
  | 'rcCompare.actions.export'
  | 'rcCompare.actions.copy'
  | 'rcCompare.actions.copyDone'
  | 'rcCompare.summary.title'
  | 'rcCompare.summary.changedGroups'
  | 'rcCompare.summary.totalChanges'
  | 'rcCompare.group.routes.title'
  | 'rcCompare.group.modules.title'
  | 'rcCompare.group.home.title'
  | 'rcCompare.group.trust.title'
  | 'rcCompare.group.workflow.title'
  | 'rcCompare.group.tokenization.title'
  | 'rcCompare.group.presale.title'
  | 'rcCompare.group.configurator.title'
  | 'rcCompare.group.partners.title'
  | 'rcCompare.group.investors.title'
  | 'rcCompare.group.customers.title'
  | 'rcCompare.group.i18n.title'
  | 'rcCompare.group.release.title'
  | 'rcCompare.group.smoke.title'
  | 'rcCompare.group.gate.title'
  | 'rcCompare.empty.title'
  | 'rcCompare.empty.text'
  | 'rcCompare.diff.added'
  | 'rcCompare.diff.removed'
  | 'rcCompare.diff.changed'
  | 'rcCompare.view.showOnlyChanged'
  | 'rcCompare.view.showAll'
  // Changelog keys
  | 'changelog.title'
  | 'changelog.subtitle'
  | 'changelog.notice.devOnly'
  | 'changelog.select.a'
  | 'changelog.select.b'
  | 'changelog.actions.swap'
  | 'changelog.actions.exportMd'
  | 'changelog.actions.exportJson'
  | 'changelog.actions.copyEn'
  | 'changelog.actions.copyRu'
  | 'changelog.actions.copyDone'
  | 'changelog.view.languageLabel'
  | 'changelog.view.showJson'
  | 'changelog.summary.title'
  | 'changelog.summary.changedGroups'
  | 'changelog.summary.totalItems'
  | 'changelog.template.headerTitle'
  | 'changelog.template.added'
  | 'changelog.template.changed'
  | 'changelog.template.removed'
  | 'changelog.template.fixed'
  | 'changelog.template.notes'
  | 'changelog.template.truncatedNote'
  | 'changelog.empty.title'
  | 'changelog.empty.text'
  | 'changelog.group.routes.title'
  | 'changelog.group.modules.title'
  | 'changelog.group.home.title'
  | 'changelog.group.trust.title'
  | 'changelog.group.workflow.title'
  | 'changelog.group.tokenization.title'
  | 'changelog.group.presale.title'
  | 'changelog.group.configurator.title'
  | 'changelog.group.partners.title'
  | 'changelog.group.investors.title'
  | 'changelog.group.customers.title'
  | 'changelog.group.i18n.title'
  | 'changelog.group.release.title'
  | 'changelog.group.smoke.title'
  | 'changelog.group.gate.title'
  // Release Notes keys
  | 'releaseNotes.title'
  | 'releaseNotes.subtitle'
  | 'releaseNotes.notice.devOnly'
  | 'releaseNotes.select.a'
  | 'releaseNotes.select.b'
  | 'releaseNotes.actions.swap'
  | 'releaseNotes.actions.exportMd'
  | 'releaseNotes.actions.exportJson'
  | 'releaseNotes.actions.copyEn'
  | 'releaseNotes.actions.copyRu'
  | 'releaseNotes.actions.copyDone'
  | 'releaseNotes.view.languageLabel'
  | 'releaseNotes.sections.meta.title'
  | 'releaseNotes.sections.readiness.title'
  | 'releaseNotes.sections.highlights.title'
  | 'releaseNotes.sections.changelog.title'
  | 'releaseNotes.sections.quality.title'
  | 'releaseNotes.sections.knownIssues.title'
  | 'releaseNotes.sections.links.title'
  | 'releaseNotes.sections.nextSteps.title'
  | 'releaseNotes.meta.generatedAt'
  | 'releaseNotes.meta.fromRc'
  | 'releaseNotes.meta.toRc'
  | 'releaseNotes.meta.status'
  | 'releaseNotes.readiness.overall'
  | 'releaseNotes.readiness.releaseP0'
  | 'releaseNotes.readiness.smokeP0'
  | 'releaseNotes.readiness.i18nMissing'
  | 'releaseNotes.quality.releaseChecklist'
  | 'releaseNotes.quality.smokeChecklist'
  | 'releaseNotes.knownIssues.add'
  | 'releaseNotes.knownIssues.edit'
  | 'releaseNotes.knownIssues.delete'
  | 'releaseNotes.knownIssues.severityLabel'
  | 'releaseNotes.knownIssues.ownerLabel'
  | 'releaseNotes.knownIssues.notesPlaceholder'
  | 'releaseNotes.knownIssues.severity.low'
  | 'releaseNotes.knownIssues.severity.medium'
  | 'releaseNotes.knownIssues.severity.high'
  | 'releaseNotes.knownIssues.empty'
  | 'releaseNotes.links.open'
  | 'releaseNotes.nextSteps.placeholder'
  | 'releaseNotes.highlights.mostChanges'
  // Publish Center
  | 'publish.title'
  | 'publish.subtitle'
  | 'publish.notice.devOnly'
  | 'publish.selectRc.label'
  | 'publish.actions.createPacket'
  | 'publish.actions.savePacket'
  | 'publish.actions.loadPacket'
  | 'publish.actions.deletePacket'
  | 'publish.actions.download'
  | 'publish.actions.downloadAll'
  | 'publish.actions.copy'
  | 'publish.actions.copyDone'
  | 'publish.actions.generate'
  | 'publish.actions.regenerate'
  | 'publish.section.packet.title'
  | 'publish.section.files.title'
  | 'publish.section.checklist.title'
  | 'publish.section.deployment.title'
  | 'publish.section.savedPackets.title'
  | 'publish.file.rc_bundle.title'
  | 'publish.file.rc_snapshot.title'
  | 'publish.file.rc_gate.title'
  | 'publish.file.rc_release.title'
  | 'publish.file.rc_smoke.title'
  | 'publish.file.release_notes_en_md.title'
  | 'publish.file.release_notes_ru_md.title'
  | 'publish.file.release_notes_en_json.title'
  | 'publish.file.release_notes_ru_json.title'
  | 'publish.file.manifest.title'
  | 'publish.file.deployment_steps_en.title'
  | 'publish.file.deployment_steps_ru.title'
  | 'publish.file.publish_checklist.title'
  | 'publish.check.gate_green.title'
  | 'publish.check.smoke_p0_pass.title'
  | 'publish.check.release_p0_done.title'
  | 'publish.check.i18n_complete.title'
  | 'publish.check.changelog_reviewed.title'
  | 'publish.check.release_notes_reviewed.title'
  | 'publish.check.known_issues_documented.title'
  | 'publish.check.deployment_steps_verified.title'
  | 'publish.check.backup_created.title'
  | 'publish.check.stakeholders_notified.title'
  | 'publish.check.rollback_plan_ready.title'
  | 'publish.check.monitoring_configured.title'
  | 'publish.check.docs_updated.title'
  | 'publish.check.final_approval.title'
  | 'publish.priority.p0'
  | 'publish.priority.p1'
  | 'publish.priority.p2'
  | 'publish.deploy.step1.en'
  | 'publish.deploy.step1.ru'
  | 'publish.deploy.step2.en'
  | 'publish.deploy.step2.ru'
  | 'publish.deploy.step3.en'
  | 'publish.deploy.step3.ru'
  | 'publish.deploy.step4.en'
  | 'publish.deploy.step4.ru'
  | 'publish.deploy.step5.en'
  | 'publish.deploy.step5.ru'
  | 'publish.deploy.step6.en'
  | 'publish.deploy.step6.ru'
  | 'publish.packet.name.label'
  | 'publish.packet.name.placeholder'
  | 'publish.packet.created.label'
  | 'publish.packet.status.draft'
  | 'publish.packet.status.ready'
  | 'publish.packet.status.published'
  | 'publish.savedPackets.empty'
  | 'publish.savedPackets.load'
  | 'publish.savedPackets.delete'
  | 'publish.manifest.version'
  | 'publish.manifest.buildDate'
  | 'publish.manifest.rcFrom'
  | 'publish.manifest.rcTo'
  // Post Release
  | 'postRelease.title'
  | 'postRelease.subtitle'
  | 'postRelease.notice.devOnly'
  | 'postRelease.selectPacket.label'
  | 'postRelease.actions.newReport'
  | 'postRelease.actions.save'
  | 'postRelease.actions.delete'
  | 'postRelease.actions.exportMd'
  | 'postRelease.actions.exportJson'
  | 'postRelease.actions.copyEn'
  | 'postRelease.actions.copyRu'
  | 'postRelease.actions.copyDone'
  | 'postRelease.view.languageLabel'
  | 'postRelease.sections.meta.title'
  | 'postRelease.sections.deployment.title'
  | 'postRelease.sections.readiness.title'
  | 'postRelease.sections.issues.title'
  | 'postRelease.sections.incidents.title'
  | 'postRelease.sections.actions.title'
  | 'postRelease.sections.notes.title'
  | 'postRelease.fields.releaseDate'
  | 'postRelease.fields.environment'
  | 'postRelease.fields.deployUrl'
  | 'postRelease.fields.tagOrCommit'
  | 'postRelease.fields.gateStatus'
  | 'postRelease.fields.issuesFound'
  | 'postRelease.fields.incidents'
  | 'postRelease.fields.actionItems'
  | 'postRelease.fields.owner'
  | 'postRelease.fields.due'
  | 'postRelease.fields.notes'
  | 'postRelease.status.green'
  | 'postRelease.status.yellow'
  | 'postRelease.status.red'
  | 'postRelease.env.prod'
  | 'postRelease.env.staging'
  | 'postRelease.list.title'
  | 'postRelease.list.empty.title'
  | 'postRelease.list.empty.text'
  | 'postRelease.placeholder.none'
  // Form Submission
  | 'form.submit.sending'
  | 'form.submit.success'
  | 'form.submit.successId'
  | 'form.submit.error'
  | 'form.submit.errorRetry'
  | 'form.submit.button'
  | 'form.submit.submitting'
  | 'form.validation.emailRequired'
  | 'form.validation.emailInvalid'
  // Admin Viewer
  | 'admin.title'
  | 'admin.subtitle'
  | 'admin.notice.devOnly'
  | 'admin.tabs.leads'
  | 'admin.tabs.requests'
  | 'admin.filters.source'
  | 'admin.filters.search'
  | 'admin.filters.limit'
  | 'admin.actions.export'
  | 'admin.actions.copy'
  | 'admin.actions.copyDone'
  | 'admin.actions.openApiLeads'
  | 'admin.actions.openApiRequests'
  | 'admin.list.empty.title'
  | 'admin.list.empty.text'
  | 'admin.detail.title'
  | 'admin.detail.rawJson'
  | 'admin.fields.id'
  | 'admin.fields.createdAt'
  | 'admin.fields.updatedAt'
  | 'admin.fields.source'
  | 'admin.fields.email'
  | 'admin.fields.name'
  | 'admin.fields.phone'
  | 'admin.sources.presale'
  | 'admin.sources.configurator_quote'
  | 'admin.sources.partners'
  | 'admin.sources.investors_deck'
  | 'admin.sources.customers_docs'
  // Admin workflow status
  | 'admin.status.label'
  | 'admin.status.new'
  | 'admin.status.reviewed'
  | 'admin.status.contacted'
  | 'admin.status.closed'
  | 'admin.status.archived'
  | 'admin.actions.saveStatus'
  | 'admin.actions.addNote'
  | 'admin.actions.archiveRecord'
  | 'admin.notes.title'
  | 'admin.notes.empty'
  | 'admin.notes.placeholder'
  | 'admin.messages.saved'
  | 'admin.messages.error'
  // Migration Prep
  | 'migrate.title'
  | 'migrate.subtitle'
  | 'migrate.notice.devOnly'
  | 'migrate.section.export.title'
  | 'migrate.section.seed.title'
  | 'migrate.section.map.title'
  | 'migrate.section.validation.title'
  | 'migrate.actions.downloadRaw'
  | 'migrate.actions.downloadSeed'
  | 'migrate.actions.downloadMapJson'
  | 'migrate.actions.downloadMapMd'
  | 'migrate.actions.downloadValidation'
  | 'migrate.actions.copy'
  | 'migrate.actions.copyDone'
  | 'migrate.summary.leadsCount'
  | 'migrate.summary.requestsCount'
  | 'migrate.summary.notesCount'
  | 'migrate.summary.tagsCount'
  | 'migrate.validation.title'
  | 'migrate.validation.invalidEmails'
  | 'migrate.validation.duplicates'
  | 'migrate.validation.missingFields'
  | 'migrate.validation.invalidStatuses'
  | 'migrate.validation.oversizedNotes'
  | 'migrate.validation.warnings'
  | 'migrate.validation.passed'
  // Storage mode
  | 'storage.mode.label'
  | 'storage.mode.config'
  | 'storage.mode.prisma'
  // Backup
  | 'backup.title'
  | 'backup.subtitle'
  | 'backup.notice.devOnly'
  | 'backup.section.create.title'
  | 'backup.section.restore.title'
  | 'backup.actions.create'
  | 'backup.actions.download'
  | 'backup.actions.copy'
  | 'backup.actions.validate'
  | 'backup.actions.dryRun'
  | 'backup.actions.applyMerge'
  | 'backup.actions.applyOverwrite'
  | 'backup.actions.copyDone'
  | 'backup.fields.restoreMode'
  | 'backup.fields.pasteJsonPlaceholder'
  | 'backup.summary.counts'
  | 'backup.report.created'
  | 'backup.report.updated'
  | 'backup.report.deleted'
  | 'backup.report.errors'
  | 'backup.errors.tooLarge'
  | 'backup.errors.invalidJson'
  | 'backup.mode.merge'
  | 'backup.mode.overwrite'
  | 'backup.warning.overwrite'
  // Retention
  | 'retention.title'
  | 'retention.subtitle'
  | 'retention.notice.devOnly'
  | 'retention.actions.dryRun'
  | 'retention.actions.apply'
  | 'retention.fields.days'
  | 'retention.fields.includeNew'
  | 'retention.report.title'
  | 'retention.report.eligibleCount'
  | 'retention.report.bySource'
  | 'retention.report.byStatus'
  | 'retention.report.byAge'
  | 'retention.messages.applied'
  | 'retention.messages.capped'
  | 'retention.errors.tooMany'
  | 'retention.bucket.b0_7'
  | 'retention.bucket.b8_30'
  | 'retention.bucket.b31_90'
  | 'retention.bucket.b90'
  // Admin - Retention
  | 'admin.retention.title'
  | 'admin.retention.openTool'
  | 'admin.retention.daysLabel'
  | 'admin.retention.preview'
  | 'admin.retention.apply'
  // Forms - Unified Submit
  | 'forms.errors.unknownForm'
  | 'forms.errors.validationFailed'
  | 'forms.errors.serverError'
  | 'forms.errors.invalidBody'
  | 'forms.errors.missingFormId'
  | 'forms.errors.invalidLocale'
  | 'forms.errors.missingValues'
  | 'forms.submit.success'
  | 'forms.submit.failed'
  | 'forms.validation.required'
  | 'forms.validation.invalidEmail'
  // Forms - Customers Docs
  | 'forms.customersDocs.title'
  | 'forms.customersDocs.description'
  | 'forms.customersDocs.fields.name'
  | 'forms.customersDocs.fields.email'
  | 'forms.customersDocs.fields.phone'
  | 'forms.customersDocs.fields.country'
  | 'forms.customersDocs.fields.interest'
  | 'forms.customersDocs.fields.notes'
  | 'forms.customersDocs.interest.ownership'
  | 'forms.customersDocs.interest.charter'
  | 'forms.customersDocs.interest.maintenance'
  | 'forms.customersDocs.interest.other'
  | 'forms.customersDocs.submit'
  | 'forms.customersDocs.successTitle'
  | 'forms.customersDocs.successText'
  // Forms - Anti-spam
  | 'forms.errors.tooLarge'
  | 'forms.errors.honeypot'
  | 'forms.errors.rateLimited'
  | 'forms.errors.banned'
  | 'forms.errors.cooldown'
  | 'forms.cooldown.waitPrefix'
  | 'forms.cooldown.seconds'
  | 'forms.honeypot.label';

/**
 * Translation dictionary
 */
export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.ecosystem': 'Ecosystem',
    'nav.token': 'Tokenization',
    'nav.platform': 'Platform',
    'nav.partners': 'Partners',
    'nav.investors': 'Investors',
    'nav.customers': 'Customers',
    'nav.dashboard': 'Dashboard',
    'nav.presale': 'Presale',
    'nav.trust': 'Trust Center',
    // Dashboard navigation
    'dash.overview': 'Overview',
    'dash.documents': 'Documents',
    'dash.requests': 'Requests',
    'dash.support': 'Support',
    'dash.settings': 'Settings',
    // Dashboard access denied
    'dash.accessDenied.title': 'Access Denied',
    'dash.accessDenied.text': 'You do not have permission to view this page. Please contact support if you believe this is an error.',
    // Dashboard placeholder
    'dash.placeholder.title': 'Coming Soon',
    'dash.placeholder.text': 'This section is under development. Check back later for updates.',
    // CTAs
    'cta.primary': 'Get Started',
    'cta.secondary': 'Learn More',
    'cta.learnMore': 'Learn More',
    // Footer
    'footer.disclaimer': 'FlyANGT is a digital platform for aviation coordination. Participation does not constitute investment advice.',
    'footer.company': 'Fintechme',
    // Common
    'common.comingSoon': 'Coming Soon',
    'common.moduleDisabled': 'This module is not available yet. Please check back later.',
    'common.role': 'Role',
    // Trust Center - Categories
    'trust.category.legal': 'Legal',
    'trust.category.legal.desc': 'Terms, agreements, and legal documentation',
    'trust.category.manuals': 'Manuals',
    'trust.category.manuals.desc': 'User guides and operational manuals',
    'trust.category.maintenance': 'Maintenance',
    'trust.category.maintenance.desc': 'Aircraft maintenance documentation',
    'trust.category.sales': 'Sales',
    'trust.category.sales.desc': 'Partner and sales resources',
    'trust.category.quality': 'Quality',
    'trust.category.quality.desc': 'Quality assurance standards',
    'trust.category.forms': 'Forms',
    'trust.category.forms.desc': 'Application forms and templates',
    'trust.category.policies': 'Policies',
    'trust.category.policies.desc': 'Company policies and procedures',
    // Trust Center - Documents
    'trust.doc.terms.title': 'Terms of Service',
    'trust.doc.terms.desc': 'Platform usage terms and conditions',
    'trust.doc.privacy.title': 'Privacy Policy',
    'trust.doc.privacy.desc': 'How we handle your personal data',
    'trust.doc.platform-manual.title': 'Platform User Manual',
    'trust.doc.platform-manual.desc': 'Complete guide to using the platform',
    'trust.doc.maintenance-guide.title': 'Aircraft Maintenance Guide',
    'trust.doc.maintenance-guide.desc': 'Maintenance procedures and schedules',
    'trust.doc.sales-kit.title': 'Partner Sales Kit',
    'trust.doc.sales-kit.desc': 'Marketing materials for partners',
    'trust.doc.qa-standards.title': 'Quality Assurance Standards',
    'trust.doc.qa-standards.desc': 'Quality benchmarks and processes',
    'trust.doc.partner-form.title': 'Partner Application Form',
    'trust.doc.partner-form.desc': 'Apply to become a partner',
    'trust.doc.data-retention.title': 'Data Retention Policy',
    'trust.doc.data-retention.desc': 'Data storage and disposal guidelines',
    'trust.doc.flight-ops.title': 'Flight Operations Manual',
    'trust.doc.flight-ops.desc': 'Flight procedures and protocols',
    'trust.doc.compliance.title': 'Regulatory Compliance',
    'trust.doc.compliance.desc': 'Aviation regulatory information',
    'trust.doc.investor-deck.title': 'Investor Presentation',
    'trust.doc.investor-deck.desc': 'Business overview for investors',
    'trust.doc.security.title': 'Security Policy',
    'trust.doc.security.desc': 'Platform security measures',
    'trust.doc.whitepaper.title': 'Whitepaper',
    'trust.doc.whitepaper.desc': 'Tokenization framework and technical documentation',
    // Trust Center - UI
    'trust.title': 'Trust Center',
    'trust.subtitle': 'Access compliance documents, policies, and resources',
    'trust.search.placeholder': 'Search documents...',
    'trust.filter.all': 'All Categories',
    'trust.filter.category': 'Category',
    'trust.filter.type': 'File Type',
    'trust.sort.newest': 'Newest First',
    'trust.sort.oldest': 'Oldest First',
    'trust.sort.name': 'Name A-Z',
    'trust.noResults': 'No documents found',
    'trust.docCount': 'documents',
    'trust.version': 'Version',
    'trust.lastUpdated': 'Last Updated',
    'trust.download': 'Download',
    'trust.openLink': 'Open Link',
    'trust.backToCatalog': 'Back to Catalog',
    'trust.keyPoints': 'Key Points',
    'trust.restricted': 'Restricted Access',
    // Presale - Weeks
    'presale.week.1': 'Week 1',
    'presale.week.2': 'Week 2',
    'presale.week.3': 'Week 3',
    'presale.week.4': 'Week 4',
    'presale.week.5': 'Week 5',
    'presale.week.6': 'Week 6',
    'presale.week.7': 'Week 7',
    'presale.week.8': 'Week 8',
    'presale.week.9': 'Week 9',
    'presale.week.10': 'Week 10',
    // Presale - Bonuses
    'presale.bonus.early': 'Early Bird Bonus',
    // Presale - Status
    'presale.status.upcoming': 'Upcoming',
    'presale.status.active': 'Active',
    'presale.status.completed': 'Completed',
    // Configurator - Navigation
    'nav.configurator': 'Configurator',
    // Configurator - Groups
    'cfg.group.model': 'Aircraft Model',
    'cfg.group.model.desc': 'Select your base aircraft model',
    'cfg.group.exterior': 'Exterior',
    'cfg.group.exterior.desc': 'Choose your exterior finish',
    'cfg.group.interior': 'Interior',
    'cfg.group.interior.desc': 'Configure cabin interior',
    'cfg.group.avionics': 'Avionics',
    'cfg.group.avionics.desc': 'Select avionics package',
    'cfg.group.safety': 'Safety',
    'cfg.group.safety.desc': 'Add safety equipment',
    'cfg.group.packages': 'Packages',
    'cfg.group.packages.desc': 'Additional services and packages',
    // Configurator - Model options
    'cfg.opt.model.light': 'Light Sport',
    'cfg.opt.model.light.desc': 'Compact and efficient for training and personal use',
    'cfg.opt.model.standard': 'Standard Touring',
    'cfg.opt.model.standard.desc': 'Versatile aircraft for various missions',
    'cfg.opt.model.performance': 'Performance',
    'cfg.opt.model.performance.desc': 'Enhanced speed and range capabilities',
    'cfg.opt.model.executive': 'Executive',
    'cfg.opt.model.executive.desc': 'Premium aircraft for business travel',
    // Configurator - Exterior options
    'cfg.opt.ext.white': 'Classic White',
    'cfg.opt.ext.silver': 'Metallic Silver',
    'cfg.opt.ext.blue': 'Sky Blue',
    'cfg.opt.ext.black': 'Carbon Black',
    'cfg.opt.ext.custom': 'Custom Livery',
    'cfg.opt.ext.custom.desc': 'Custom paint scheme design',
    // Configurator - Interior options
    'cfg.opt.int.standard': 'Standard',
    'cfg.opt.int.standard.desc': 'Durable fabric seats and basic trim',
    'cfg.opt.int.comfort': 'Comfort',
    'cfg.opt.int.comfort.desc': 'Enhanced seats with premium fabric',
    'cfg.opt.int.executive': 'Executive',
    'cfg.opt.int.executive.desc': 'Leather seats with wood accents',
    'cfg.opt.int.luxury': 'Luxury',
    'cfg.opt.int.luxury.desc': 'Full leather interior with custom finishes',
    // Configurator - Avionics options
    'cfg.opt.avio.basic': 'Basic VFR',
    'cfg.opt.avio.basic.desc': 'Standard VFR instruments and radio',
    'cfg.opt.avio.advanced': 'Advanced IFR',
    'cfg.opt.avio.advanced.desc': 'Full IFR capable with GPS navigation',
    'cfg.opt.avio.premium': 'Premium Glass',
    'cfg.opt.avio.premium.desc': 'Glass cockpit with dual screens',
    'cfg.opt.avio.integrated': 'Integrated Suite',
    'cfg.opt.avio.integrated.desc': 'Full integrated flight management system',
    // Configurator - Safety options
    'cfg.opt.safe.parachute': 'Airframe Parachute',
    'cfg.opt.safe.parachute.desc': 'Whole aircraft recovery parachute system',
    'cfg.opt.safe.tracker': 'Flight Tracker',
    'cfg.opt.safe.tracker.desc': 'Real-time satellite tracking device',
    'cfg.opt.safe.beacon': 'Emergency Beacon',
    'cfg.opt.safe.beacon.desc': 'Personal locator beacon (PLB)',
    'cfg.opt.safe.oxygen': 'Oxygen System',
    'cfg.opt.safe.oxygen.desc': 'Supplemental oxygen for high altitude',
    'cfg.opt.safe.fire': 'Fire Suppression',
    'cfg.opt.safe.fire.desc': 'Engine fire detection and suppression',
    // Configurator - Package options
    'cfg.opt.pkg.training': 'Training Package',
    'cfg.opt.pkg.training.desc': 'Pilot transition training included',
    'cfg.opt.pkg.maintenance': 'Maintenance Plan',
    'cfg.opt.pkg.maintenance.desc': 'First year maintenance coverage',
    'cfg.opt.pkg.warranty': 'Extended Warranty',
    'cfg.opt.pkg.warranty.desc': '3-year extended warranty coverage',
    'cfg.opt.pkg.delivery': 'Delivery Service',
    'cfg.opt.pkg.delivery.desc': 'Ferry flight to your location',
    'cfg.opt.pkg.insurance': 'Insurance Package',
    'cfg.opt.pkg.insurance.desc': 'First year hull and liability insurance',
    'cfg.opt.pkg.hangar': 'Hangar Package',
    'cfg.opt.pkg.hangar.desc': 'Hangar rental assistance service',
    // Configurator - Pricing
    'cfg.pricing.note': 'Prices are estimates and subject to change',
    // Workflow - Navigation
    'nav.workflow': 'Workflow',
    'dash.workflow': 'My Progress',
    // Workflow - Steps: Configure
    'wf.step.configure.title': 'Configure',
    'wf.step.configure.summary': 'Design your aircraft with our configurator, select options, and finalize specifications.',
    'wf.step.configure.check.1': 'Select base aircraft model',
    'wf.step.configure.check.2': 'Choose exterior and interior options',
    'wf.step.configure.check.3': 'Configure avionics package',
    'wf.step.configure.check.4': 'Add safety equipment',
    'wf.step.configure.check.5': 'Review and save configuration',
    // Workflow - Steps: Qualification
    'wf.step.qualification.title': 'Qualification',
    'wf.step.qualification.summary': 'Submit your documents for buyer qualification and regulatory compliance review.',
    'wf.step.qualification.check.1': 'Submit identification documents',
    'wf.step.qualification.check.2': 'Provide proof of funds',
    'wf.step.qualification.check.3': 'Complete regulatory questionnaire',
    'wf.step.qualification.check.4': 'Verify pilot certification status',
    'wf.step.qualification.check.5': 'Review aviation authority requirements',
    'wf.step.qualification.check.6': 'Receive qualification approval',
    // Workflow - Steps: Contract
    'wf.step.contract.title': 'Contract',
    'wf.step.contract.summary': 'Review and sign purchase agreement, confirm payment terms and delivery schedule.',
    'wf.step.contract.check.1': 'Review purchase agreement',
    'wf.step.contract.check.2': 'Confirm payment schedule',
    'wf.step.contract.check.3': 'Sign contract documents',
    'wf.step.contract.check.4': 'Submit initial deposit',
    // Workflow - Steps: Build
    'wf.step.build.title': 'Build',
    'wf.step.build.summary': 'Your aircraft enters production with regular progress updates and milestone tracking.',
    'wf.step.build.check.1': 'Production slot assigned',
    'wf.step.build.check.2': 'Airframe assembly started',
    'wf.step.build.check.3': 'Systems installation',
    'wf.step.build.check.4': 'Avionics integration',
    'wf.step.build.check.5': 'Interior completion',
    'wf.step.build.check.6': 'Paint and exterior finish',
    'wf.step.build.check.7': 'Final assembly complete',
    // Workflow - Steps: QA
    'wf.step.qa.title': 'Quality Assurance',
    'wf.step.qa.summary': 'Comprehensive testing, inspection, and certification to ensure safety and performance.',
    'wf.step.qa.check.1': 'Ground systems testing',
    'wf.step.qa.check.2': 'Engine run-up tests',
    'wf.step.qa.check.3': 'Flight testing program',
    'wf.step.qa.check.4': 'Quality inspection sign-off',
    'wf.step.qa.check.5': 'Airworthiness certification',
    // Workflow - Steps: Training
    'wf.step.training.title': 'Training',
    'wf.step.training.summary': 'Pilot transition training and systems familiarization for safe aircraft operation.',
    'wf.step.training.check.1': 'Ground school completion',
    'wf.step.training.check.2': 'Simulator sessions',
    'wf.step.training.check.3': 'Flight training hours',
    'wf.step.training.check.4': 'Systems operation review',
    'wf.step.training.check.5': 'Emergency procedures training',
    'wf.step.training.check.6': 'Check ride and certification',
    // Workflow - Steps: Delivery
    'wf.step.delivery.title': 'Delivery',
    'wf.step.delivery.summary': 'Final acceptance, documentation handover, and aircraft delivery to your location.',
    'wf.step.delivery.check.1': 'Final acceptance inspection',
    'wf.step.delivery.check.2': 'Documentation package review',
    'wf.step.delivery.check.3': 'Final payment processing',
    'wf.step.delivery.check.4': 'Title transfer completion',
    'wf.step.delivery.check.5': 'Ferry flight or pickup coordination',
    // Workflow - Steps: Service
    'wf.step.service.title': 'Service',
    'wf.step.service.summary': 'Ongoing maintenance support, warranty service, and continuous owner assistance.',
    'wf.step.service.check.1': 'Warranty registration complete',
    'wf.step.service.check.2': 'Maintenance schedule established',
    'wf.step.service.check.3': 'Support portal access granted',
    'wf.step.service.check.4': 'First service appointment scheduled',
    // Workflow - Document labels
    'wf.doc.terms': 'Terms of Service',
    'wf.doc.privacy': 'Privacy Policy',
    'wf.doc.application': 'Application Form',
    'wf.doc.compliance': 'Regulatory Compliance',
    'wf.doc.dataRetention': 'Data Retention Policy',
    'wf.doc.qaStandards': 'QA Standards',
    'wf.doc.flightOps': 'Flight Operations Manual',
    'wf.doc.platformManual': 'Platform Manual',
    'wf.doc.security': 'Security Policy',
    'wf.doc.maintenance': 'Maintenance Guide',
    // Workflow - UI labels
    'wf.progress': 'Progress',
    'wf.currentStep': 'Current step',
    'wf.stepOf': 'Step {n} of {total}',
    // Request - Status
    'req.status.draft': 'Draft',
    'req.status.in_review': 'In Review',
    'req.status.scheduled': 'Scheduled',
    'req.status.in_progress': 'In Progress',
    'req.status.completed': 'Completed',
    // Request - Stub titles
    'req.stub.config1.title': 'Light Sport Configuration',
    'req.stub.qualification1.title': 'Standard Touring Order',
    'req.stub.build1.title': 'Performance Build',
    'req.stub.training1.title': 'Executive Training Package',
    'req.stub.completed1.title': 'Completed Delivery',
    // Request - UI labels
    'req.noRequests': 'No requests yet',
    'req.viewWorkflow': 'View workflow',
    'req.openConfigurator': 'Continue configuring',
    'req.openPresale': 'View presale',
    // Token - Sections
    'token.section.overview.title': 'Tokenization Overview',
    'token.section.overview.text': 'FlyANGT uses tokenization as a coordination layer for aviation operations. This framework enables transparent, auditable participation in the platform ecosystem without speculative mechanics.',
    'token.section.overview.bullet.1': 'Coordination mechanism for platform participants',
    'token.section.overview.bullet.2': 'Transparent rules defined in auditable smart contracts',
    'token.section.overview.bullet.3': 'Operational utility, not speculative instrument',
    'token.section.why.title': 'Why Tokenization',
    'token.section.why.text': 'Traditional aviation coordination relies on fragmented systems and manual processes. Tokenization provides a unified framework for tracking participation, verifying credentials, and coordinating activities across the ecosystem.',
    'token.section.why.bullet.1': 'Unified coordination across aviation services',
    'token.section.why.bullet.2': 'Verifiable records of platform participation',
    'token.section.why.bullet.3': 'Reduced administrative overhead',
    'token.section.why.bullet.4': 'Clear, auditable governance rules',
    'token.section.utility.title': 'Token Utility',
    'token.section.utility.text': 'Tokens within the FlyANGT ecosystem serve specific operational purposes. They are not designed as investment vehicles but as functional units within the platform.',
    'token.section.utility.bullet.1': 'Access to platform services and features',
    'token.section.utility.bullet.2': 'Participation in governance decisions',
    'token.section.utility.bullet.3': 'Service fee coordination',
    'token.section.utility.bullet.4': 'Ecosystem incentive alignment',
    'token.section.interaction.title': 'Platform Interaction',
    'token.section.interaction.text': 'Participants interact with the tokenization layer through the FlyANGT platform. All operations are subject to platform terms and applicable regulations.',
    'token.section.interaction.bullet.1': 'Web-based platform interface',
    'token.section.interaction.bullet.2': 'Documented processes in Trust Center',
    'token.section.interaction.bullet.3': 'Support available through dashboard',
    'token.section.transparency.title': 'Transparency and Compliance',
    'token.section.transparency.text': 'All tokenization rules and operations are documented in the Trust Center. We maintain transparency about the framework while ensuring compliance with applicable regulations.',
    'token.section.transparency.bullet.1': 'Public documentation of all rules',
    'token.section.transparency.bullet.2': 'Regular compliance reviews',
    'token.section.transparency.bullet.3': 'Audit trails for all operations',
    'token.section.whitepaper.title': 'Technical Documentation',
    'token.section.whitepaper.text': 'The whitepaper provides detailed technical documentation of the tokenization framework, including architecture, governance mechanisms, and operational procedures.',
    'token.section.risks.title': 'Risk Disclosure',
    'token.section.risks.text': 'Participation in the FlyANGT tokenization framework involves risks that participants must understand and accept before engaging with the platform.',
    'token.section.risks.bullet.1': 'Tokens are not securities and do not represent equity or ownership',
    'token.section.risks.bullet.2': 'No guaranteed returns or financial outcomes',
    'token.section.risks.bullet.3': 'Technology risks including smart contract vulnerabilities',
    'token.section.risks.bullet.4': 'Regulatory and market environment may change',
    // Token - CTAs
    'token.cta.reviewFramework': 'Review Framework',
    'token.cta.openWhitepaper': 'Open Whitepaper',
    'token.cta.exploreParticipation': 'Explore Participation',
    // Token - UI
    'token.readInTrust': 'Read in Trust Center',
    'token.riskDisclosure': 'Risk Disclosure',
    // Partner - Types
    'partner.type.dealer': 'Dealer',
    'partner.type.mro': 'MRO',
    'partner.type.hangar': 'Hangar',
    'partner.type.flight_school': 'Flight School',
    'partner.type.marketing_pr': 'Marketing & PR',
    'partner.type.payments': 'Payments',
    'partner.type.crm_support': 'CRM & Support',
    'partner.type.market_making': 'Market Making',
    'partner.type.integrator': 'Integrator',
    // Partner - Regions
    'partner.region.cyprus': 'Cyprus',
    'partner.region.eu': 'European Union',
    'partner.region.mena': 'MENA',
    'partner.region.global': 'Global',
    // Partner - Status
    'partner.status.planned': 'Planned',
    'partner.status.active': 'Active',
    'partner.status.pilot': 'Pilot',
    // Partner - Services
    'partner.service.sales': 'Sales',
    'partner.service.build_assist': 'Build Assistance',
    'partner.service.maintenance': 'Maintenance',
    'partner.service.hangar_storage': 'Hangar Storage',
    'partner.service.training': 'Training',
    'partner.service.payments': 'Payments',
    'partner.service.crm': 'CRM',
    'partner.service.support': 'Support',
    'partner.service.liquidity': 'Liquidity',
    'partner.service.compliance': 'Compliance',
    // Partner - Group labels
    'partner.group.offline': 'Offline Partners',
    'partner.group.digital': 'Digital Partners',
    // Partner - Directory UI
    'partner.filter.all': 'All',
    'partner.filter.type': 'Type',
    'partner.filter.region': 'Region',
    'partner.filter.services': 'Services',
    // Partner - Seed data
    'partner.aero_cyprus.headline': 'Official Aircraft Dealer in Cyprus',
    'partner.aero_cyprus.description': 'Aero Cyprus Dealers is the official distribution partner for light aircraft sales in the Cyprus region, providing full sales cycle support from configuration to delivery.',
    'partner.aero_cyprus.highlight.1': 'Exclusive Cyprus territory rights',
    'partner.aero_cyprus.highlight.2': 'Full build-assist program support',
    'partner.skybridge.headline': 'European Sales Network',
    'partner.skybridge.description': 'SkyBridge EU connects buyers across Western Europe with FlyANGT aircraft, offering localized sales support and regulatory assistance.',
    'partner.skybridge.highlight.1': 'Multi-country EU coverage',
    'partner.gulf_aviation.headline': 'MENA Region Sales Partner',
    'partner.gulf_aviation.description': 'Gulf Aviation Sales brings FlyANGT aircraft to the Middle East and North Africa markets with specialized regional expertise.',
    'partner.cyprus_aircraft.headline': 'EASA Part 145 Approved MRO',
    'partner.cyprus_aircraft.description': 'Cyprus Aircraft Services provides certified maintenance, repair, and overhaul services for FlyANGT aircraft with full regulatory compliance.',
    'partner.cyprus_aircraft.highlight.1': 'EASA Part 145 certification',
    'partner.cyprus_aircraft.highlight.2': 'Factory-trained technicians',
    'partner.eurotech.headline': 'European MRO Network',
    'partner.eurotech.description': 'EuroTech MRO offers maintenance services across EU airports with mobile teams and fixed facilities.',
    'partner.larnaca_hangar.headline': 'Premium Hangar Facilities',
    'partner.larnaca_hangar.description': 'Larnaca Hangar Solutions provides secure, climate-controlled aircraft storage near Larnaca International Airport.',
    'partner.larnaca_hangar.highlight.1': '24/7 security and access',
    'partner.dubai_storage.headline': 'MENA Hangar Network',
    'partner.dubai_storage.description': 'Dubai Sky Storage offers premium hangar facilities in key MENA locations with concierge services.',
    'partner.med_flight.headline': 'Licensed Flight Training Academy',
    'partner.med_flight.description': 'Mediterranean Flight Academy provides type-specific training for FlyANGT aircraft owners and pilots.',
    'partner.med_flight.highlight.1': 'Type rating certification',
    'partner.med_flight.highlight.2': 'Simulator and flight training',
    'partner.eu_pilot.headline': 'European Training Center',
    'partner.eu_pilot.description': 'EU Pilot Training Center offers pilot conversion courses and recurrent training across multiple EU locations.',
    'partner.aviation_media.headline': 'Global Aviation Marketing',
    'partner.aviation_media.description': 'Aviation Media Global provides marketing, PR, and media services for the FlyANGT ecosystem.',
    'partner.flyfi.headline': 'Aviation Payment Solutions',
    'partner.flyfi.description': 'FlyFi Payments enables secure, compliant payment processing for aircraft transactions and platform services.',
    'partner.flyfi.highlight.1': 'Multi-currency support',
    'partner.aerocrm.headline': 'Customer Management Platform',
    'partner.aerocrm.description': 'AeroCRM Solutions provides customer relationship management and support infrastructure for the FlyANGT network.',
    'partner.liquidity.headline': 'Market Liquidity Provider',
    'partner.liquidity.description': 'Liquidity Partners will provide market-making services for the FlyANGT tokenization framework.',
    'partner.skyconnect.headline': 'System Integration Services',
    'partner.skyconnect.description': 'SkyConnect Integrations develops custom integrations between FlyANGT platform and third-party aviation systems.',
    'partner.mena_tech.headline': 'MENA Tech Solutions',
    'partner.mena_tech.description': 'MENA Aviation Tech provides localized technical support and system integration for the MENA region.',
    // Partner - Filter UI (additional)
    'partner.filter.allTypes': 'All Types',
    'partner.filter.allRegions': 'All Regions',
    'partner.viewProfile': 'View Profile',
    // Investors - Sections
    'investors.section.thesis.title': 'Investment Thesis',
    'investors.section.thesis.text': 'FlyANGT addresses a structural gap in general aviation: kit aircraft owners lack coordinated access to certified services.',
    'investors.section.thesis.bullet.1': 'Kit aircraft represent a growing segment with underserved operational needs',
    'investors.section.thesis.bullet.2': 'Fragmented service landscape creates friction for owners and partners',
    'investors.section.thesis.bullet.3': 'Platform approach enables scalable coordination without heavy asset ownership',
    'investors.section.market.title': 'Market Opportunity',
    'investors.section.market.text': 'The kit aircraft market continues to expand globally, driven by cost advantages and regulatory developments.',
    'investors.section.market.bullet.1': 'Growing kit aircraft registrations in Europe, MENA, and emerging markets',
    'investors.section.market.bullet.2': 'Limited institutional service providers for this aircraft category',
    'investors.section.market.bullet.3': 'Recurring revenue potential from maintenance, training, and compliance services',
    'investors.section.market.bullet.4': 'Network effects as partner ecosystem and user base grow',
    'investors.section.stack.title': 'Product Stack',
    'investors.section.stack.text': 'FlyANGT operates a hybrid model combining offline aviation services with digital platform capabilities.',
    'investors.section.stack.bullet.1': 'Build Assist: Guided kit assembly with certified technician oversight',
    'investors.section.stack.bullet.2': 'Service Network: MRO, hangar, and training partner coordination',
    'investors.section.stack.bullet.3': 'Digital Platform: Workflow management, document handling, compliance tracking',
    'investors.section.stack.bullet.4': 'Token Layer: Utility token for platform services and ecosystem participation',
    'investors.section.revenue.title': 'Revenue Model',
    'investors.section.revenue.text': 'Multiple revenue streams from both offline services and digital platform operations.',
    'investors.section.revenue.bullet.1': 'Service fees from Build Assist programs and consultation',
    'investors.section.revenue.bullet.2': 'Partner referral and coordination fees',
    'investors.section.revenue.bullet.3': 'Platform subscription and transaction fees',
    'investors.section.revenue.bullet.4': 'Token utility fees and ecosystem participation',
    'investors.section.revenue.bullet.5': 'Training and certification program fees',
    'investors.section.unit_economics.title': 'What We Validate',
    'investors.section.unit_economics.text': 'Our unit economics framework focuses on validating key operational and financial metrics.',
    'investors.section.unit_economics.bullet.1': 'Customer acquisition cost relative to lifetime value',
    'investors.section.unit_economics.bullet.2': 'Service margin sustainability across partner network',
    'investors.section.unit_economics.bullet.3': 'Platform engagement and retention metrics',
    'investors.section.unit_economics.bullet.4': 'Token velocity and utility adoption patterns',
    'investors.section.unit_economics.bullet.5': 'Partner network growth and retention rates',
    'investors.section.presale_plan.title': 'Presale to Listing',
    'investors.section.presale_plan.text': 'A structured 10-week program from token presale through exchange listing.',
    'investors.section.presale_plan.bullet.1': 'Phase 1: Presale launch with early participant benefits',
    'investors.section.presale_plan.bullet.2': 'Phase 2: Community building and ecosystem development',
    'investors.section.presale_plan.bullet.3': 'Phase 3: Platform feature rollout and partner onboarding',
    'investors.section.presale_plan.bullet.4': 'Phase 4: Compliance verification and audit completion',
    'investors.section.presale_plan.bullet.5': 'Phase 5: Exchange listing and liquidity provision',
    'investors.section.presale_plan.cta': 'View Presale Details',
    'investors.section.token_role.title': 'Token Utility',
    'investors.section.token_role.text': 'The ANGT token serves as the utility layer for platform services, not as a speculative investment vehicle.',
    'investors.section.token_role.bullet.1': 'Service access and discount mechanism within platform',
    'investors.section.token_role.bullet.2': 'Ecosystem participation and governance signaling',
    'investors.section.token_role.bullet.3': 'Partner and user incentive alignment',
    'investors.section.token_role.cta': 'Learn About Tokenization',
    'investors.section.trust.title': 'Transparency',
    'investors.section.trust.text': 'All documentation, compliance reports, and operational details are available in our Trust Center.',
    'investors.section.trust.cta': 'Open Trust Center',
    'investors.section.cta.title': 'Get the Full Picture',
    'investors.section.cta.text': 'Request our investor deck for detailed information on market analysis, financial projections, and team background.',
    // Investors - Metrics
    'investors.metric.cac.label': 'Customer Acquisition Cost',
    'investors.metric.cac.note': 'Cost to acquire qualified aircraft owner',
    'investors.metric.conversion.label': 'Conversion Rate',
    'investors.metric.conversion.note': 'Lead to paying customer conversion',
    'investors.metric.margin.label': 'Gross Margin',
    'investors.metric.margin.note': 'Service and platform margin targets',
    'investors.metric.service_utilization.label': 'Service Utilization',
    'investors.metric.service_utilization.note': 'Partner capacity utilization rate',
    'investors.metric.ltv.label': 'Lifetime Value',
    'investors.metric.ltv.note': 'Total customer value over relationship',
    'investors.metric.build_assist_capacity.label': 'Build Assist Capacity',
    'investors.metric.build_assist_capacity.note': 'Concurrent projects capacity',
    'investors.metric.nps.label': 'Net Promoter Score',
    'investors.metric.nps.note': 'Customer satisfaction indicator',
    'investors.metric.warranty_claims.label': 'Warranty Claims Rate',
    'investors.metric.warranty_claims.note': 'Service quality indicator',
    'investors.metric.training_attach.label': 'Training Attach Rate',
    'investors.metric.training_attach.note': 'Training upsell conversion',
    'investors.metric.token_velocity.label': 'Token Velocity',
    'investors.metric.token_velocity.note': 'Token utility and circulation',
    'investors.metric.partner_retention.label': 'Partner Retention',
    'investors.metric.partner_retention.note': 'Annual partner retention rate',
    'investors.metric.platform_gmv.label': 'Platform GMV',
    'investors.metric.platform_gmv.note': 'Gross merchandise value indicator',
    // Customers - Sections
    'customers.section.what_you_get.title': 'What You Get',
    'customers.section.what_you_get.text': 'FlyANGT provides a complete value stack for kit aircraft ownership.',
    'customers.section.what_you_get.bullet.1': 'Guided Owner Assisted Build with checklists and photo logs',
    'customers.section.what_you_get.bullet.2': 'Access to certified MRO partners and hangar facilities',
    'customers.section.what_you_get.bullet.3': 'Pilot transition training and recurrent programs',
    'customers.section.what_you_get.bullet.4': 'Digital documentation and compliance management',
    'customers.section.what_you_get.bullet.5': 'Transparent process with milestone tracking',
    'customers.section.why_owner_assisted.title': 'Why Owner Assisted Build',
    'customers.section.why_owner_assisted.text': 'Building your own aircraft creates deeper connection and understanding.',
    'customers.section.why_owner_assisted.bullet.1': 'Step-by-step guidance with certified technician oversight',
    'customers.section.why_owner_assisted.bullet.2': 'Photo logs and documentation for every stage',
    'customers.section.why_owner_assisted.bullet.3': 'Quality checkpoints verified by professionals',
    'customers.section.journey.title': 'Your Journey',
    'customers.section.journey.text': 'From initial interest to flying your aircraft, we guide you through each step.',
    'customers.section.service.title': 'Service and Maintenance',
    'customers.section.service.text': 'Our partner network provides comprehensive maintenance coverage.',
    'customers.section.service.bullet.1': 'Scheduled A/B/C checks with certified technicians',
    'customers.section.service.bullet.2': 'Parts sourcing through verified suppliers',
    'customers.section.service.bullet.3': 'Warranty claim coordination and support',
    'customers.section.service.bullet.4': 'Service history tracking in your digital cabinet',
    'customers.section.service.bullet.5': 'Emergency support and AOG assistance',
    'customers.section.training.title': 'Training and Safety',
    'customers.section.training.text': 'Comprehensive training programs for safe aircraft operation.',
    'customers.section.training.bullet.1': 'Type-specific transition training with certified instructors',
    'customers.section.training.bullet.2': 'Go/no-go decision culture and weather assessment',
    'customers.section.training.bullet.3': 'Emergency procedures and scenario training',
    'customers.section.training.bullet.4': 'Recurrent training programs and proficiency checks',
    'customers.section.ownership.title': 'Ownership Models',
    'customers.section.ownership.text': 'Different ways to own and operate your aircraft.',
    'customers.section.digital_cabinet.title': 'Digital Cabinet',
    'customers.section.digital_cabinet.text': 'All your aircraft documentation in one secure platform.',
    'customers.section.digital_cabinet.bullet.1': 'Centralized document storage with version control',
    'customers.section.digital_cabinet.bullet.2': 'Service request tracking and history',
    'customers.section.digital_cabinet.bullet.3': 'Direct communication with partners and support',
    'customers.section.digital_cabinet.bullet.4': 'Compliance monitoring and renewal reminders',
    'customers.section.request_docs.title': 'Get More Information',
    'customers.section.request_docs.text': 'Request detailed documentation about our programs.',
    'customers.section.cta.title': 'Ready to Start?',
    'customers.section.cta.text': 'Begin your aircraft ownership journey with FlyANGT.',
    // Home page
    'home.paths.title': 'Choose Your Path',
    'home.paths.text': 'Select your role to see relevant information.',
    'home.modules.title': 'Platform Modules',
    'home.modules.text': 'Explore the FlyANGT ecosystem.',
    'home.trust.title': 'Trust Center',
    'home.trust.text': 'Access compliance documents and policies.',
    'home.workflow.title': 'Order to Flight',
    'home.workflow.text': 'Understand the complete journey.',
    'home.quick.title': 'Quick Actions',
    'home.quick.text': 'Jump to key areas.',
    'home.updates.title': 'Latest Updates',
    'home.updates.text': 'Recent announcements.',
    // Generic UI labels
    'ui.back': 'Back',
    'ui.open': 'Open',
    'ui.search': 'Search',
    'ui.filter': 'Filter',
    'ui.reset': 'Reset',
    'ui.save': 'Save',
    'ui.submit': 'Submit',
    'ui.cancel': 'Cancel',
    'ui.close': 'Close',
    'ui.loading': 'Loading...',
    'ui.error': 'Error',
    'ui.success': 'Success',
    'ui.viewAll': 'View All',
    'ui.showMore': 'Show More',
    'ui.showLess': 'Show Less',
    // Release checklist (dev tool)
    'nav.release': 'Release',
    'release.title': 'Release Checklist',
    'release.subtitle': 'Track release readiness across modules',
    'release.filters.status': 'Status',
    'release.filters.priority': 'Priority',
    'release.filters.module': 'Module',
    'release.status.todo': 'To Do',
    'release.status.in_progress': 'In Progress',
    'release.status.blocked': 'Blocked',
    'release.status.done': 'Done',
    'release.status.na': 'N/A',
    'release.priority.p0': 'P0 Critical',
    'release.priority.p1': 'P1 High',
    'release.priority.p2': 'P2 Medium',
    'release.actions.reset': 'Reset All',
    'release.actions.export': 'Export JSON',
    'release.actions.collapseAll': 'Collapse All',
    'release.actions.expandAll': 'Expand All',
    'release.notes.placeholder': 'Add notes...',
    'release.empty.title': 'No Items',
    'release.empty.text': 'No checklist items match your filters.',
    'release.progress.label': 'Progress',
    'release.progress.complete': 'Complete',
    // Release module titles
    'release.module.home.title': 'Home',
    'release.module.trust.title': 'Trust Center',
    'release.module.presale.title': 'Presale',
    'release.module.configurator.title': 'Configurator',
    'release.module.workflow.title': 'Workflow',
    'release.module.token.title': 'Token',
    'release.module.partners.title': 'Partners',
    'release.module.investors.title': 'Investors',
    'release.module.customers.title': 'Customers',
    'release.module.dashboard.title': 'Dashboard',
    'release.module.i18n.title': 'I18n',
    'release.module.ux.title': 'UX',
    // Release check titles - Home
    'release.check.home-no-hardcoded.title': 'No hardcoded strings',
    'release.check.home-i18n-coverage.title': 'EN/RU i18n coverage',
    'release.check.home-nav-links.title': 'Navigation links work',
    'release.check.home-responsive.title': 'Responsive layout verified',
    'release.check.home-module-cards.title': 'Module cards link correctly',
    'release.check.home-pathway-links.title': 'Pathway cards work',
    // Release check titles - Trust
    'release.check.trust-no-hardcoded.title': 'No hardcoded strings',
    'release.check.trust-i18n-coverage.title': 'EN/RU i18n coverage',
    'release.check.trust-filter-works.title': 'Category filter works',
    'release.check.trust-search-works.title': 'Search filter works',
    'release.check.trust-empty-state.title': 'Empty state displays',
    'release.check.trust-doc-links.title': 'Document links work',
    'release.check.trust-detail-pages.title': 'Detail pages render',
    'release.check.trust-restricted-badge.title': 'Restricted badge shows',
    // Release check titles - Presale
    'release.check.presale-no-hardcoded.title': 'No hardcoded strings',
    'release.check.presale-i18n-coverage.title': 'EN/RU i18n coverage',
    'release.check.presale-disabled-state.title': 'Disabled state shows',
    'release.check.presale-config-toggle.title': 'Config toggle works',
    'release.check.presale-calculator.title': 'Calculator works',
    'release.check.presale-form-validation.title': 'Form validation works',
    'release.check.presale-week-ladder.title': 'Week ladder displays',
    // Release check titles - Configurator
    'release.check.cfg-no-hardcoded.title': 'No hardcoded strings',
    'release.check.cfg-i18n-coverage.title': 'EN/RU i18n coverage',
    'release.check.cfg-disabled-state.title': 'Disabled state shows',
    'release.check.cfg-config-toggle.title': 'Config toggle works',
    'release.check.cfg-group-nav.title': 'Group navigation works',
    'release.check.cfg-option-select.title': 'Option selection works',
    'release.check.cfg-price-calc.title': 'Price calculation works',
    'release.check.cfg-summary-panel.title': 'Summary panel displays',
    // Release check titles - Workflow
    'release.check.wf-no-hardcoded.title': 'No hardcoded strings',
    'release.check.wf-i18n-coverage.title': 'EN/RU i18n coverage',
    'release.check.wf-step-navigation.title': 'Step navigation works',
    'release.check.wf-step-detail.title': 'Step detail pages work',
    'release.check.wf-doc-links.title': 'Document links work',
    'release.check.wf-progress-display.title': 'Progress indicator works',
    'release.check.wf-checklist-items.title': 'Checklist items display',
    // Release check titles - Token
    'release.check.token-no-hardcoded.title': 'No hardcoded strings',
    'release.check.token-i18n-coverage.title': 'EN/RU i18n coverage',
    'release.check.token-disabled-state.title': 'Disabled state shows',
    'release.check.token-sections.title': 'All sections render',
    'release.check.token-risk-disclosure.title': 'Risk disclosure visible',
    'release.check.token-cta-links.title': 'CTA links work',
    // Release check titles - Partners
    'release.check.partners-no-hardcoded.title': 'No hardcoded strings',
    'release.check.partners-i18n-coverage.title': 'EN/RU i18n coverage',
    'release.check.partners-filter-works.title': 'Filters work correctly',
    'release.check.partners-empty-state.title': 'Empty state displays',
    'release.check.partners-detail-pages.title': 'Partner details render',
    'release.check.partners-map-display.title': 'Map/location display',
    'release.check.partners-service-chips.title': 'Service chips display',
    // Release check titles - Investors
    'release.check.inv-no-hardcoded.title': 'No hardcoded strings',
    'release.check.inv-i18n-coverage.title': 'EN/RU i18n coverage',
    'release.check.inv-sections.title': 'All sections render',
    'release.check.inv-metrics-display.title': 'Metrics display correctly',
    'release.check.inv-cta-links.title': 'CTA links work',
    'release.check.inv-final-cta.title': 'Final CTA displays',
    // Release check titles - Customers
    'release.check.cust-no-hardcoded.title': 'No hardcoded strings',
    'release.check.cust-i18n-coverage.title': 'EN/RU i18n coverage',
    'release.check.cust-sections.title': 'All sections render',
    'release.check.cust-journey-display.title': 'Journey display works',
    'release.check.cust-cta-links.title': 'CTA links work',
    'release.check.cust-final-cta.title': 'Final CTA displays',
    // Release check titles - Dashboard
    'release.check.dash-no-hardcoded.title': 'No hardcoded strings',
    'release.check.dash-i18n-coverage.title': 'EN/RU i18n coverage',
    'release.check.dash-nav-works.title': 'Dashboard nav works',
    'release.check.dash-role-guard.title': 'Role guard verified',
    'release.check.dash-placeholder-pages.title': 'Placeholder pages work',
    'release.check.dash-requests-list.title': 'Requests list works',
    'release.check.dash-localStorage.title': 'LocalStorage persists',
    // Release check titles - I18n
    'release.check.i18n-en-coverage.title': 'EN coverage complete',
    'release.check.i18n-ru-coverage.title': 'RU coverage complete',
    'release.check.i18n-lang-switch.title': 'Language switch works',
    'release.check.i18n-url-param.title': 'URL param works',
    'release.check.i18n-fallback.title': 'Fallback to EN works',
    'release.check.i18n-audit-hidden.title': 'Audit page hidden in prod',
    // Release check titles - UX
    'release.check.ux-design-tokens.title': 'Design tokens applied',
    'release.check.ux-ui-primitives.title': 'UI primitives used',
    'release.check.ux-empty-states.title': 'Empty states verified',
    'release.check.ux-loading-states.title': 'Loading states work',
    'release.check.ux-responsive.title': 'Responsive design verified',
    'release.check.ux-dev-routes-hidden.title': 'Dev routes hidden in prod',
    'release.check.ux-no-api-calls.title': 'No external API calls',
    'release.check.ux-config-driven.title': 'Config-driven architecture',
    // Prelaunch
    'prelaunch.banner': 'Content Locked - Prelaunch Mode',
    'prelaunch.draftsBlockedTitle': 'Drafts Disabled',
    'prelaunch.draftsBlockedText': 'Draft saving is disabled during prelaunch lock. Your input will not be saved.',
    // Snapshot
    'snapshot.title': 'Configuration Snapshot',
    'snapshot.subtitle': 'Export current configuration state for review',
    'snapshot.actions.download': 'Download JSON',
    'snapshot.actions.copy': 'Copy to Clipboard',
    'snapshot.notice.devOnly': 'This page is only available in development mode.',
    'snapshot.disabled': 'Snapshot export is disabled in configuration.',
    'snapshot.copied': 'Copied to clipboard',
    'snapshot.summary.mode': 'Prelaunch Mode',
    'snapshot.summary.configs': 'Configs Included',
    'snapshot.summary.pages': 'Content Pages',
    'snapshot.summary.generated': 'Generated At',
    // Export Center
    'export.title': 'Export Center',
    'export.subtitle': 'Download configuration artifacts for release packaging',
    'export.artifact.snapshot.title': 'Configuration Snapshot',
    'export.artifact.snapshot.text': 'Complete system configuration state including routes, modules, and content metadata.',
    'export.artifact.release.title': 'Release Readiness',
    'export.artifact.release.text': 'Current release checklist state with progress and notes.',
    'export.artifact.i18n.title': 'i18n Report',
    'export.artifact.i18n.text': 'Translation coverage and missing keys per locale.',
    'export.artifact.smoke.title': 'Smoke Test Links',
    'export.artifact.smoke.text': 'List of routes for quick browser validation.',
    'export.artifact.bundle.title': 'Full Export Bundle',
    'export.artifact.bundle.text': 'All artifacts combined into a single file.',
    'export.actions.download': 'Download',
    'export.actions.copy': 'Copy',
    'export.actions.copyDone': 'Copied',
    'export.notice.devOnly': 'This page is only available in development mode.',
    'export.smoke.openAll': 'Open All',

    // Smoke test
    'smoke.title': 'Smoke Test Runner',
    'smoke.subtitle': 'Manual smoke testing for all routes',
    'smoke.group.publicCore': 'Public Core',
    'smoke.group.trustCenter': 'Trust Center',
    'smoke.group.presale': 'Presale',
    'smoke.group.configurator': 'Configurator',
    'smoke.group.token': 'Tokenization',
    'smoke.group.partners': 'Partners',
    'smoke.group.investors': 'Investors',
    'smoke.group.customers': 'Customers',
    'smoke.group.workflow': 'Workflow',
    'smoke.group.dashboardBasic': 'Dashboard',
    'smoke.group.devTools': 'Dev Tools',
    'smoke.status.untested': 'Untested',
    'smoke.status.pass': 'Pass',
    'smoke.status.fail': 'Fail',
    'smoke.status.skip': 'Skip',
    'smoke.actions.markPass': 'Pass',
    'smoke.actions.markFail': 'Fail',
    'smoke.actions.markSkip': 'Skip',
    'smoke.actions.reset': 'Reset',
    'smoke.actions.resetAll': 'Reset All',
    'smoke.actions.export': 'Export Results',
    'smoke.actions.openRoute': 'Open',
    'smoke.summary.total': 'Total',
    'smoke.summary.passed': 'Passed',
    'smoke.summary.failed': 'Failed',
    'smoke.summary.skipped': 'Skipped',
    'smoke.summary.untested': 'Untested',
    'smoke.notice.devOnly': 'This page is only available in development mode.',
    'smoke.notes.placeholder': 'Add notes...',

    // Gate
    'gate.title': 'Prelaunch Gate',
    'gate.subtitle': 'Dev tools and readiness overview',
    'gate.summary.overall': 'Overall Status',
    'gate.summary.releaseP0': 'Release P0 Items',
    'gate.summary.smokeP0': 'Smoke P0 Tests',
    'gate.summary.i18nMissing': 'Missing i18n Keys',
    'gate.summary.devTools': 'Dev Tools',
    'gate.actions.openRelease': 'Release Checklist',
    'gate.actions.openSmoke': 'Smoke Runner',
    'gate.actions.openExport': 'Export Center',
    'gate.actions.openSnapshot': 'Snapshot',
    'gate.actions.openI18n': 'i18n Audit',
    'gate.banner.message': 'Prelaunch gate open',
    'gate.status.green': 'Ready',
    'gate.status.yellow': 'In Progress',
    'gate.status.red': 'Blocked',
    'gate.notice.devOnly': 'Dev tools only. Not a security boundary.',

    // RC (Release Candidate)
    'rc.title': 'Release Candidate Manager',
    'rc.subtitle': 'Create and manage release candidate snapshots',
    'rc.notice.devOnly': 'Dev tool only. LocalStorage based RC history.',
    'rc.actions.create': 'Create RC',
    'rc.actions.delete': 'Delete',
    'rc.actions.select': 'Select',
    'rc.actions.unselect': 'Unselect',
    'rc.actions.download': 'Download',
    'rc.actions.copy': 'Copy',
    'rc.actions.copyDone': 'Copied',
    'rc.actions.openGate': 'Open Gate',
    'rc.actions.openExport': 'Open Export',
    'rc.actions.openRelease': 'Open Release',
    'rc.actions.openSmoke': 'Open Smoke',
    'rc.list.title': 'RC History',
    'rc.list.empty.title': 'No Release Candidates',
    'rc.list.empty.text': 'Create your first RC to capture the current state.',
    'rc.detail.title': 'RC Details',
    'rc.fields.id': 'RC ID',
    'rc.fields.createdAt': 'Created',
    'rc.fields.status': 'Status',
    'rc.fields.selected': 'Selected',
    'rc.status.green': 'Ready',
    'rc.status.yellow': 'In Progress',
    'rc.status.red': 'Blocked',
    'rc.artifact.snapshot': 'Snapshot',
    'rc.artifact.bundle': 'Bundle',
    'rc.artifact.release': 'Release State',
    'rc.artifact.smoke': 'Smoke State',
    'rc.artifact.gate': 'Gate Summary',
    'rc.confirmDelete.title': 'Delete RC?',
    'rc.confirmDelete.text': 'This action cannot be undone.',

    // RC Compare
    'rcCompare.title': 'RC Compare',
    'rcCompare.subtitle': 'Compare differences between release candidates',
    'rcCompare.notice.devOnly': 'Dev tool only. Compares stored RC artifacts.',
    'rcCompare.select.a': 'RC A',
    'rcCompare.select.b': 'RC B',
    'rcCompare.actions.swap': 'Swap',
    'rcCompare.actions.export': 'Export Diff',
    'rcCompare.actions.copy': 'Copy',
    'rcCompare.actions.copyDone': 'Copied',
    'rcCompare.summary.title': 'Comparison Summary',
    'rcCompare.summary.changedGroups': 'Changed Groups',
    'rcCompare.summary.totalChanges': 'Total Changes',
    'rcCompare.group.routes.title': 'Routes',
    'rcCompare.group.modules.title': 'Modules',
    'rcCompare.group.home.title': 'Home',
    'rcCompare.group.trust.title': 'Trust Center',
    'rcCompare.group.workflow.title': 'Workflow',
    'rcCompare.group.tokenization.title': 'Tokenization',
    'rcCompare.group.presale.title': 'Presale',
    'rcCompare.group.configurator.title': 'Configurator',
    'rcCompare.group.partners.title': 'Partners',
    'rcCompare.group.investors.title': 'Investors',
    'rcCompare.group.customers.title': 'Customers',
    'rcCompare.group.i18n.title': 'i18n',
    'rcCompare.group.release.title': 'Release State',
    'rcCompare.group.smoke.title': 'Smoke State',
    'rcCompare.group.gate.title': 'Gate Summary',
    'rcCompare.empty.title': 'Select Two RCs',
    'rcCompare.empty.text': 'Select two release candidates to compare.',
    'rcCompare.diff.added': 'Added',
    'rcCompare.diff.removed': 'Removed',
    'rcCompare.diff.changed': 'Changed',
    'rcCompare.view.showOnlyChanged': 'Show Only Changed',
    'rcCompare.view.showAll': 'Show All Groups',

    // Changelog
    'changelog.title': 'Changelog Generator',
    'changelog.subtitle': 'Generate release notes from RC differences',
    'changelog.notice.devOnly': 'Dev tool only. Deterministic transformation.',
    'changelog.select.a': 'From RC',
    'changelog.select.b': 'To RC',
    'changelog.actions.swap': 'Swap',
    'changelog.actions.exportMd': 'Export MD',
    'changelog.actions.exportJson': 'Export JSON',
    'changelog.actions.copyEn': 'Copy EN',
    'changelog.actions.copyRu': 'Copy RU',
    'changelog.actions.copyDone': 'Copied',
    'changelog.view.languageLabel': 'Preview Language',
    'changelog.view.showJson': 'Show JSON',
    'changelog.summary.title': 'Summary',
    'changelog.summary.changedGroups': 'Changed Groups',
    'changelog.summary.totalItems': 'Total Items',
    'changelog.template.headerTitle': 'Changelog',
    'changelog.template.added': 'Added',
    'changelog.template.changed': 'Changed',
    'changelog.template.removed': 'Removed',
    'changelog.template.fixed': 'Fixed',
    'changelog.template.notes': 'Notes',
    'changelog.template.truncatedNote': '... and more items',
    'changelog.empty.title': 'Select Two RCs',
    'changelog.empty.text': 'Select two release candidates to generate changelog.',
    'changelog.group.routes.title': 'Routes',
    'changelog.group.modules.title': 'Modules',
    'changelog.group.home.title': 'Home',
    'changelog.group.trust.title': 'Trust Center',
    'changelog.group.workflow.title': 'Workflow',
    'changelog.group.tokenization.title': 'Tokenization',
    'changelog.group.presale.title': 'Presale',
    'changelog.group.configurator.title': 'Configurator',
    'changelog.group.partners.title': 'Partners',
    'changelog.group.investors.title': 'Investors',
    'changelog.group.customers.title': 'Customers',
    'changelog.group.i18n.title': 'Translations',
    'changelog.group.release.title': 'Release State',
    'changelog.group.smoke.title': 'Smoke Tests',
    'changelog.group.gate.title': 'Gate Status',

    // Release Notes
    'releaseNotes.title': 'Release Notes Pack',
    'releaseNotes.subtitle': 'Generate complete release documentation',
    'releaseNotes.notice.devOnly': 'Dev tool only. Deterministic template.',
    'releaseNotes.select.a': 'From RC',
    'releaseNotes.select.b': 'To RC',
    'releaseNotes.actions.swap': 'Swap',
    'releaseNotes.actions.exportMd': 'Export MD',
    'releaseNotes.actions.exportJson': 'Export JSON',
    'releaseNotes.actions.copyEn': 'Copy EN',
    'releaseNotes.actions.copyRu': 'Copy RU',
    'releaseNotes.actions.copyDone': 'Copied',
    'releaseNotes.view.languageLabel': 'Preview Language',
    'releaseNotes.sections.meta.title': 'Meta',
    'releaseNotes.sections.readiness.title': 'Readiness',
    'releaseNotes.sections.highlights.title': 'Highlights',
    'releaseNotes.sections.changelog.title': 'Changelog',
    'releaseNotes.sections.quality.title': 'Quality Summary',
    'releaseNotes.sections.knownIssues.title': 'Known Issues',
    'releaseNotes.sections.links.title': 'Links',
    'releaseNotes.sections.nextSteps.title': 'Next Steps',
    'releaseNotes.meta.generatedAt': 'Generated',
    'releaseNotes.meta.fromRc': 'From RC',
    'releaseNotes.meta.toRc': 'To RC',
    'releaseNotes.meta.status': 'Status',
    'releaseNotes.readiness.overall': 'Overall Status',
    'releaseNotes.readiness.releaseP0': 'Release P0',
    'releaseNotes.readiness.smokeP0': 'Smoke P0',
    'releaseNotes.readiness.i18nMissing': 'i18n Missing',
    'releaseNotes.quality.releaseChecklist': 'Release Checklist',
    'releaseNotes.quality.smokeChecklist': 'Smoke Tests',
    'releaseNotes.knownIssues.add': 'Add Issue',
    'releaseNotes.knownIssues.edit': 'Edit',
    'releaseNotes.knownIssues.delete': 'Delete',
    'releaseNotes.knownIssues.severityLabel': 'Severity',
    'releaseNotes.knownIssues.ownerLabel': 'Owner',
    'releaseNotes.knownIssues.notesPlaceholder': 'Additional notes...',
    'releaseNotes.knownIssues.severity.low': 'Low',
    'releaseNotes.knownIssues.severity.medium': 'Medium',
    'releaseNotes.knownIssues.severity.high': 'High',
    'releaseNotes.knownIssues.empty': 'No known issues',
    'releaseNotes.links.open': 'Open',
    'releaseNotes.nextSteps.placeholder': 'Review release notes with team before publishing.',
    'releaseNotes.highlights.mostChanges': 'Most changes in',
    // Publish Center
    'publish.title': 'Publish Center',
    'publish.subtitle': 'Assemble and manage publish packets',
    'publish.notice.devOnly': 'Development tool — disabled in production',
    'publish.selectRc.label': 'Select RC Version',
    'publish.actions.createPacket': 'Create Packet',
    'publish.actions.savePacket': 'Save Packet',
    'publish.actions.loadPacket': 'Load Packet',
    'publish.actions.deletePacket': 'Delete Packet',
    'publish.actions.download': 'Download',
    'publish.actions.downloadAll': 'Download All',
    'publish.actions.copy': 'Copy',
    'publish.actions.copyDone': 'Copied!',
    'publish.actions.generate': 'Generate',
    'publish.actions.regenerate': 'Regenerate',
    'publish.section.packet.title': 'Packet Info',
    'publish.section.files.title': 'Publish Files',
    'publish.section.checklist.title': 'Publish Checklist',
    'publish.section.deployment.title': 'Deployment Steps',
    'publish.section.savedPackets.title': 'Saved Packets',
    'publish.file.rc_bundle.title': 'RC Bundle (Full)',
    'publish.file.rc_snapshot.title': 'RC Snapshot',
    'publish.file.rc_gate.title': 'Gate Status',
    'publish.file.rc_release.title': 'Release Checklist',
    'publish.file.rc_smoke.title': 'Smoke Tests',
    'publish.file.release_notes_en_md.title': 'Release Notes (EN, Markdown)',
    'publish.file.release_notes_ru_md.title': 'Release Notes (RU, Markdown)',
    'publish.file.release_notes_en_json.title': 'Release Notes (EN, JSON)',
    'publish.file.release_notes_ru_json.title': 'Release Notes (RU, JSON)',
    'publish.file.manifest.title': 'Publish Manifest',
    'publish.file.deployment_steps_en.title': 'Deployment Steps (EN)',
    'publish.file.deployment_steps_ru.title': 'Deployment Steps (RU)',
    'publish.file.publish_checklist.title': 'Publish Checklist',
    'publish.check.gate_green.title': 'Gate status is GREEN',
    'publish.check.smoke_p0_pass.title': 'All Smoke P0 tests pass',
    'publish.check.release_p0_done.title': 'All Release P0 items done',
    'publish.check.i18n_complete.title': 'All i18n translations complete',
    'publish.check.changelog_reviewed.title': 'Changelog reviewed by team',
    'publish.check.release_notes_reviewed.title': 'Release notes reviewed',
    'publish.check.known_issues_documented.title': 'Known issues documented',
    'publish.check.deployment_steps_verified.title': 'Deployment steps verified',
    'publish.check.backup_created.title': 'Production backup created',
    'publish.check.stakeholders_notified.title': 'Stakeholders notified',
    'publish.check.rollback_plan_ready.title': 'Rollback plan ready',
    'publish.check.monitoring_configured.title': 'Monitoring configured',
    'publish.check.docs_updated.title': 'Documentation updated',
    'publish.check.final_approval.title': 'Final approval received',
    'publish.priority.p0': 'P0',
    'publish.priority.p1': 'P1',
    'publish.priority.p2': 'P2',
    'publish.deploy.step1.en': '1. Create production backup',
    'publish.deploy.step1.ru': '1. Создать резервную копию продакшена',
    'publish.deploy.step2.en': '2. Deploy to staging environment',
    'publish.deploy.step2.ru': '2. Развернуть на staging-окружении',
    'publish.deploy.step3.en': '3. Run smoke tests on staging',
    'publish.deploy.step3.ru': '3. Запустить дымовые тесты на staging',
    'publish.deploy.step4.en': '4. Deploy to production',
    'publish.deploy.step4.ru': '4. Развернуть на продакшене',
    'publish.deploy.step5.en': '5. Verify production deployment',
    'publish.deploy.step5.ru': '5. Проверить развёртывание на продакшене',
    'publish.deploy.step6.en': '6. Notify stakeholders of release',
    'publish.deploy.step6.ru': '6. Уведомить стейкхолдеров о релизе',
    'publish.packet.name.label': 'Packet Name',
    'publish.packet.name.placeholder': 'Enter packet name...',
    'publish.packet.created.label': 'Created',
    'publish.packet.status.draft': 'Draft',
    'publish.packet.status.ready': 'Ready',
    'publish.packet.status.published': 'Published',
    'publish.savedPackets.empty': 'No saved packets',
    'publish.savedPackets.load': 'Load',
    'publish.savedPackets.delete': 'Delete',
    'publish.manifest.version': 'Version',
    'publish.manifest.buildDate': 'Build Date',
    'publish.manifest.rcFrom': 'From RC',
    'publish.manifest.rcTo': 'To RC',
    // Post Release
    'postRelease.title': 'Post Release Report',
    'postRelease.subtitle': 'Generate post-release reports from publish packets',
    'postRelease.notice.devOnly': 'Development tool - disabled in production',
    'postRelease.selectPacket.label': 'Select Publish Packet',
    'postRelease.actions.newReport': 'New Report',
    'postRelease.actions.save': 'Save',
    'postRelease.actions.delete': 'Delete',
    'postRelease.actions.exportMd': 'Export MD',
    'postRelease.actions.exportJson': 'Export JSON',
    'postRelease.actions.copyEn': 'Copy EN',
    'postRelease.actions.copyRu': 'Copy RU',
    'postRelease.actions.copyDone': 'Copied!',
    'postRelease.view.languageLabel': 'Preview language',
    'postRelease.sections.meta.title': 'Meta',
    'postRelease.sections.deployment.title': 'Deployment',
    'postRelease.sections.readiness.title': 'Readiness',
    'postRelease.sections.issues.title': 'Issues Found',
    'postRelease.sections.incidents.title': 'Incidents',
    'postRelease.sections.actions.title': 'Action Items',
    'postRelease.sections.notes.title': 'Notes',
    'postRelease.fields.releaseDate': 'Release Date',
    'postRelease.fields.environment': 'Environment',
    'postRelease.fields.deployUrl': 'Deploy URL',
    'postRelease.fields.tagOrCommit': 'Tag or Commit',
    'postRelease.fields.gateStatus': 'Actual Gate Status',
    'postRelease.fields.issuesFound': 'Issues Found',
    'postRelease.fields.incidents': 'Incidents',
    'postRelease.fields.actionItems': 'Action Items',
    'postRelease.fields.owner': 'Owner',
    'postRelease.fields.due': 'Due',
    'postRelease.fields.notes': 'Notes',
    'postRelease.status.green': 'Green',
    'postRelease.status.yellow': 'Yellow',
    'postRelease.status.red': 'Red',
    'postRelease.env.prod': 'Production',
    'postRelease.env.staging': 'Staging',
    'postRelease.list.title': 'Saved Reports',
    'postRelease.list.empty.title': 'No reports',
    'postRelease.list.empty.text': 'Create a report from a publish packet to get started.',
    'postRelease.placeholder.none': 'none',
    // Form Submission
    'form.submit.sending': 'Sending...',
    'form.submit.success': 'Successfully submitted!',
    'form.submit.successId': 'Reference ID',
    'form.submit.error': 'Failed to submit. Please try again.',
    'form.submit.errorRetry': 'Retry',
    'form.submit.button': 'Submit',
    'form.submit.submitting': 'Submitting...',
    'form.validation.emailRequired': 'Email is required',
    'form.validation.emailInvalid': 'Please enter a valid email',
    // Admin Viewer
    'admin.title': 'Admin Viewer',
    'admin.subtitle': 'View and export leads and requests',
    'admin.notice.devOnly': 'Dev Only: This page is not available in production.',
    'admin.tabs.leads': 'Leads',
    'admin.tabs.requests': 'Requests',
    'admin.filters.source': 'Source',
    'admin.filters.search': 'Search',
    'admin.filters.limit': 'Limit',
    'admin.actions.export': 'Export JSON',
    'admin.actions.copy': 'Copy JSON',
    'admin.actions.copyDone': 'Copied!',
    'admin.actions.openApiLeads': 'Open Leads API',
    'admin.actions.openApiRequests': 'Open Requests API',
    'admin.list.empty.title': 'No Records',
    'admin.list.empty.text': 'No records found matching your criteria.',
    'admin.detail.title': 'Record Details',
    'admin.detail.rawJson': 'Raw JSON',
    'admin.fields.id': 'ID',
    'admin.fields.createdAt': 'Created',
    'admin.fields.updatedAt': 'Updated',
    'admin.fields.source': 'Source',
    'admin.fields.email': 'Email',
    'admin.fields.name': 'Name',
    'admin.fields.phone': 'Phone',
    'admin.sources.presale': 'Presale',
    'admin.sources.configurator_quote': 'Configurator Quote',
    'admin.sources.partners': 'Partners',
    'admin.sources.investors_deck': 'Investors Deck',
    'admin.sources.customers_docs': 'Customers Docs',
    // Admin workflow status
    'admin.status.label': 'Status',
    'admin.status.new': 'New',
    'admin.status.reviewed': 'Reviewed',
    'admin.status.contacted': 'Contacted',
    'admin.status.closed': 'Closed',
    'admin.status.archived': 'Archived',
    'admin.actions.saveStatus': 'Save',
    'admin.actions.addNote': 'Add Note',
    'admin.actions.archiveRecord': 'Archive',
    'admin.notes.title': 'Internal Notes',
    'admin.notes.empty': 'No notes yet',
    'admin.notes.placeholder': 'Add a note...',
    'admin.messages.saved': 'Saved',
    'admin.messages.error': 'Error saving',
    // Migration Prep
    'migrate.title': 'Migration Prep',
    'migrate.subtitle': 'Export data for Prisma/Postgres migration',
    'migrate.notice.devOnly': 'Dev Only: This page is not available in production.',
    'migrate.section.export.title': 'Raw Export',
    'migrate.section.seed.title': 'Seed-Ready Export',
    'migrate.section.map.title': 'Migration Map',
    'migrate.section.validation.title': 'Data Validation',
    'migrate.actions.downloadRaw': 'Download Raw JSON',
    'migrate.actions.downloadSeed': 'Download Seed JSON',
    'migrate.actions.downloadMapJson': 'Download Map JSON',
    'migrate.actions.downloadMapMd': 'Download Map Markdown',
    'migrate.actions.downloadValidation': 'Download Validation Report',
    'migrate.actions.copy': 'Copy',
    'migrate.actions.copyDone': 'Copied!',
    'migrate.summary.leadsCount': 'Leads',
    'migrate.summary.requestsCount': 'Requests',
    'migrate.summary.notesCount': 'Internal Notes',
    'migrate.summary.tagsCount': 'Tags',
    'migrate.validation.title': 'Validation Results',
    'migrate.validation.invalidEmails': 'Invalid Emails',
    'migrate.validation.duplicates': 'Duplicate Emails',
    'migrate.validation.missingFields': 'Missing Required Fields',
    'migrate.validation.invalidStatuses': 'Invalid Statuses',
    'migrate.validation.oversizedNotes': 'Oversized Notes',
    'migrate.validation.warnings': 'Warnings',
    'migrate.validation.passed': 'All checks passed',

    // Storage mode
    'storage.mode.label': 'Storage',
    'storage.mode.config': 'File DB',
    'storage.mode.prisma': 'Prisma',

    // Backup
    'backup.title': 'Backup & Restore',
    'backup.subtitle': 'Create and restore data backups',
    'backup.notice.devOnly': 'Dev Only: This page is not available in production.',
    'backup.section.create.title': 'Create Backup',
    'backup.section.restore.title': 'Restore from Backup',
    'backup.actions.create': 'Create Backup',
    'backup.actions.download': 'Download JSON',
    'backup.actions.copy': 'Copy JSON',
    'backup.actions.validate': 'Validate',
    'backup.actions.dryRun': 'Dry Run',
    'backup.actions.applyMerge': 'Apply Merge',
    'backup.actions.applyOverwrite': 'Apply Overwrite',
    'backup.actions.copyDone': 'Copied!',
    'backup.fields.restoreMode': 'Restore Mode',
    'backup.fields.pasteJsonPlaceholder': 'Paste backup JSON here...',
    'backup.summary.counts': 'Record Counts',
    'backup.report.created': 'Created',
    'backup.report.updated': 'Updated',
    'backup.report.deleted': 'Deleted',
    'backup.report.errors': 'Errors',
    'backup.errors.tooLarge': 'File too large. Maximum size is 2MB.',
    'backup.errors.invalidJson': 'Invalid JSON format.',
    'backup.mode.merge': 'Merge (upsert by ID)',
    'backup.mode.overwrite': 'Overwrite (clear all first)',
    'backup.warning.overwrite': 'Warning: Overwrite mode will delete all existing data before restoring.',

    // Retention
    'retention.title': 'Retention & Archiving',
    'retention.subtitle': 'Archive old records based on age thresholds',
    'retention.notice.devOnly': 'Dev Only: This tool is not available in production.',
    'retention.actions.dryRun': 'Preview',
    'retention.actions.apply': 'Archive Now',
    'retention.fields.days': 'Older than (days)',
    'retention.fields.includeNew': 'Include "new" status',
    'retention.report.title': 'Retention Report',
    'retention.report.eligibleCount': 'Eligible for archiving',
    'retention.report.bySource': 'By Source',
    'retention.report.byStatus': 'By Status',
    'retention.report.byAge': 'By Age',
    'retention.messages.applied': 'Successfully archived {count} records.',
    'retention.messages.capped': 'Results capped at {max} records. Narrow your criteria.',
    'retention.errors.tooMany': 'Too many records ({count}). Maximum is {max}. Use stricter filters.',
    'retention.bucket.b0_7': '0-7 days',
    'retention.bucket.b8_30': '8-30 days',
    'retention.bucket.b31_90': '31-90 days',
    'retention.bucket.b90': '90+ days',

    // Admin - Retention
    'admin.retention.title': 'Retention',
    'admin.retention.openTool': 'Open Retention Tool',
    'admin.retention.daysLabel': 'Archive older than',
    'admin.retention.preview': 'Preview',
    'admin.retention.apply': 'Apply',

    // Forms - Unified Submit
    'forms.errors.unknownForm': 'Unknown form',
    'forms.errors.validationFailed': 'Validation failed',
    'forms.errors.serverError': 'Server error',
    'forms.errors.invalidBody': 'Invalid request body',
    'forms.errors.missingFormId': 'Missing form ID',
    'forms.errors.invalidLocale': 'Invalid locale',
    'forms.errors.missingValues': 'Missing form values',
    'forms.submit.success': 'Submitted successfully',
    'forms.submit.failed': 'Submission failed',
    'forms.validation.required': 'This field is required',
    'forms.validation.invalidEmail': 'Invalid email address',

    // Forms - Customers Docs
    'forms.customersDocs.title': 'Request Documentation',
    'forms.customersDocs.description': 'Fill in the form below to request documentation.',
    'forms.customersDocs.fields.name': 'Full Name',
    'forms.customersDocs.fields.email': 'Email',
    'forms.customersDocs.fields.phone': 'Phone',
    'forms.customersDocs.fields.country': 'Country',
    'forms.customersDocs.fields.interest': 'Interest',
    'forms.customersDocs.fields.notes': 'Additional Notes',
    'forms.customersDocs.interest.ownership': 'Aircraft Ownership',
    'forms.customersDocs.interest.charter': 'Charter Services',
    'forms.customersDocs.interest.maintenance': 'Maintenance',
    'forms.customersDocs.interest.other': 'Other',
    'forms.customersDocs.submit': 'Submit Request',
    'forms.customersDocs.successTitle': 'Request Submitted',
    'forms.customersDocs.successText': 'We will contact you shortly.',

    // Forms - Anti-spam
    'forms.errors.tooLarge': 'Request too large',
    'forms.errors.honeypot': 'Spam detected',
    'forms.errors.rateLimited': 'Too many requests. Please try again later.',
    'forms.errors.banned': 'Temporarily blocked. Please try again later.',
    'forms.errors.cooldown': 'Please wait before submitting again',
    'forms.cooldown.waitPrefix': 'Please wait',
    'forms.cooldown.seconds': '{n} seconds',
    'forms.honeypot.label': 'Company',
  },
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.ecosystem': 'Экосистема',
    'nav.token': 'Токенизация',
    'nav.platform': 'Платформа',
    'nav.partners': 'Партнёры',
    'nav.investors': 'Инвесторам',
    'nav.customers': 'Клиенты',
    'nav.dashboard': 'Кабинет',
    'nav.presale': 'Пресейл',
    'nav.trust': 'Центр доверия',
    // Dashboard navigation
    'dash.overview': 'Обзор',
    'dash.documents': 'Документы',
    'dash.requests': 'Запросы',
    'dash.support': 'Поддержка',
    'dash.settings': 'Настройки',
    // Dashboard access denied
    'dash.accessDenied.title': 'Доступ запрещён',
    'dash.accessDenied.text': 'У вас нет прав для просмотра этой страницы. Обратитесь в поддержку, если считаете это ошибкой.',
    // Dashboard placeholder
    'dash.placeholder.title': 'Скоро',
    'dash.placeholder.text': 'Этот раздел находится в разработке. Загляните позже.',
    // CTAs
    'cta.primary': 'Начать',
    'cta.secondary': 'Подробнее',
    'cta.learnMore': 'Узнать больше',
    // Footer
    'footer.disclaimer': 'FlyANGT: цифровая платформа для координации в авиации. Участие не является инвестиционной рекомендацией.',
    'footer.company': 'Fintechme',
    // Common
    'common.comingSoon': 'Скоро',
    'common.moduleDisabled': 'Этот модуль пока недоступен. Пожалуйста, загляните позже.',
    'common.role': 'Роль',
    // Trust Center - Categories
    'trust.category.legal': 'Юридические',
    'trust.category.legal.desc': 'Условия, соглашения и юридическая документация',
    'trust.category.manuals': 'Руководства',
    'trust.category.manuals.desc': 'Руководства пользователя и операционные инструкции',
    'trust.category.maintenance': 'Обслуживание',
    'trust.category.maintenance.desc': 'Документация по техническому обслуживанию',
    'trust.category.sales': 'Продажи',
    'trust.category.sales.desc': 'Ресурсы для партнёров и продаж',
    'trust.category.quality': 'Качество',
    'trust.category.quality.desc': 'Стандарты обеспечения качества',
    'trust.category.forms': 'Формы',
    'trust.category.forms.desc': 'Формы заявок и шаблоны',
    'trust.category.policies': 'Политики',
    'trust.category.policies.desc': 'Политики и процедуры компании',
    // Trust Center - Documents
    'trust.doc.terms.title': 'Условия использования',
    'trust.doc.terms.desc': 'Условия и положения использования платформы',
    'trust.doc.privacy.title': 'Политика конфиденциальности',
    'trust.doc.privacy.desc': 'Как мы обрабатываем ваши персональные данные',
    'trust.doc.platform-manual.title': 'Руководство пользователя',
    'trust.doc.platform-manual.desc': 'Полное руководство по использованию платформы',
    'trust.doc.maintenance-guide.title': 'Руководство по обслуживанию',
    'trust.doc.maintenance-guide.desc': 'Процедуры и графики обслуживания',
    'trust.doc.sales-kit.title': 'Комплект продаж для партнёров',
    'trust.doc.sales-kit.desc': 'Маркетинговые материалы для партнёров',
    'trust.doc.qa-standards.title': 'Стандарты качества',
    'trust.doc.qa-standards.desc': 'Критерии и процессы качества',
    'trust.doc.partner-form.title': 'Форма заявки на партнёрство',
    'trust.doc.partner-form.desc': 'Подать заявку на партнёрство',
    'trust.doc.data-retention.title': 'Политика хранения данных',
    'trust.doc.data-retention.desc': 'Правила хранения и удаления данных',
    'trust.doc.flight-ops.title': 'Руководство по лётным операциям',
    'trust.doc.flight-ops.desc': 'Лётные процедуры и протоколы',
    'trust.doc.compliance.title': 'Соответствие нормативам',
    'trust.doc.compliance.desc': 'Информация об авиационных нормах',
    'trust.doc.investor-deck.title': 'Презентация для инвесторов',
    'trust.doc.investor-deck.desc': 'Обзор бизнеса для инвесторов',
    'trust.doc.security.title': 'Политика безопасности',
    'trust.doc.security.desc': 'Меры безопасности платформы',
    'trust.doc.whitepaper.title': 'Белая книга',
    'trust.doc.whitepaper.desc': 'Фреймворк токенизации и техническая документация',
    // Trust Center - UI
    'trust.title': 'Центр доверия',
    'trust.subtitle': 'Доступ к документам соответствия, политикам и ресурсам',
    'trust.search.placeholder': 'Поиск документов...',
    'trust.filter.all': 'Все категории',
    'trust.filter.category': 'Категория',
    'trust.filter.type': 'Тип файла',
    'trust.sort.newest': 'Сначала новые',
    'trust.sort.oldest': 'Сначала старые',
    'trust.sort.name': 'По имени А-Я',
    'trust.noResults': 'Документы не найдены',
    'trust.docCount': 'документов',
    'trust.version': 'Версия',
    'trust.lastUpdated': 'Обновлено',
    'trust.download': 'Скачать',
    'trust.openLink': 'Открыть ссылку',
    'trust.backToCatalog': 'К каталогу',
    'trust.keyPoints': 'Ключевые моменты',
    'trust.restricted': 'Ограниченный доступ',
    // Presale - Weeks
    'presale.week.1': 'Неделя 1',
    'presale.week.2': 'Неделя 2',
    'presale.week.3': 'Неделя 3',
    'presale.week.4': 'Неделя 4',
    'presale.week.5': 'Неделя 5',
    'presale.week.6': 'Неделя 6',
    'presale.week.7': 'Неделя 7',
    'presale.week.8': 'Неделя 8',
    'presale.week.9': 'Неделя 9',
    'presale.week.10': 'Неделя 10',
    // Presale - Bonuses
    'presale.bonus.early': 'Ранний бонус',
    // Presale - Status
    'presale.status.upcoming': 'Скоро',
    'presale.status.active': 'Активна',
    'presale.status.completed': 'Завершена',
    // Configurator - Navigation
    'nav.configurator': 'Конфигуратор',
    // Configurator - Groups
    'cfg.group.model': 'Модель самолета',
    'cfg.group.model.desc': 'Выберите базовую модель самолета',
    'cfg.group.exterior': 'Экстерьер',
    'cfg.group.exterior.desc': 'Выберите внешнюю отделку',
    'cfg.group.interior': 'Интерьер',
    'cfg.group.interior.desc': 'Настройте интерьер кабины',
    'cfg.group.avionics': 'Авионика',
    'cfg.group.avionics.desc': 'Выберите комплект авионики',
    'cfg.group.safety': 'Безопасность',
    'cfg.group.safety.desc': 'Добавьте оборудование безопасности',
    'cfg.group.packages': 'Пакеты',
    'cfg.group.packages.desc': 'Дополнительные услуги и пакеты',
    // Configurator - Model options
    'cfg.opt.model.light': 'Легкий спортивный',
    'cfg.opt.model.light.desc': 'Компактный и экономичный для обучения',
    'cfg.opt.model.standard': 'Стандартный туристический',
    'cfg.opt.model.standard.desc': 'Универсальный самолет для различных задач',
    'cfg.opt.model.performance': 'Скоростной',
    'cfg.opt.model.performance.desc': 'Улучшенные скорость и дальность',
    'cfg.opt.model.executive': 'Представительский',
    'cfg.opt.model.executive.desc': 'Премиум-самолет для бизнеса',
    // Configurator - Exterior options
    'cfg.opt.ext.white': 'Классический белый',
    'cfg.opt.ext.silver': 'Металлик серебро',
    'cfg.opt.ext.blue': 'Небесно-голубой',
    'cfg.opt.ext.black': 'Карбон черный',
    'cfg.opt.ext.custom': 'Индивидуальная ливрея',
    'cfg.opt.ext.custom.desc': 'Индивидуальный дизайн окраски',
    // Configurator - Interior options
    'cfg.opt.int.standard': 'Стандартный',
    'cfg.opt.int.standard.desc': 'Прочные тканевые сиденья и базовая отделка',
    'cfg.opt.int.comfort': 'Комфорт',
    'cfg.opt.int.comfort.desc': 'Улучшенные сиденья с премиум-тканью',
    'cfg.opt.int.executive': 'Представительский',
    'cfg.opt.int.executive.desc': 'Кожаные сиденья с деревянными акцентами',
    'cfg.opt.int.luxury': 'Люкс',
    'cfg.opt.int.luxury.desc': 'Полностью кожаный интерьер с индивидуальной отделкой',
    // Configurator - Avionics options
    'cfg.opt.avio.basic': 'Базовый VFR',
    'cfg.opt.avio.basic.desc': 'Стандартные приборы VFR и радио',
    'cfg.opt.avio.advanced': 'Продвинутый IFR',
    'cfg.opt.avio.advanced.desc': 'Полный IFR с GPS-навигацией',
    'cfg.opt.avio.premium': 'Премиум стеклянная кабина',
    'cfg.opt.avio.premium.desc': 'Стеклянная кабина с двумя экранами',
    'cfg.opt.avio.integrated': 'Интегрированный комплекс',
    'cfg.opt.avio.integrated.desc': 'Полная система управления полетом',
    // Configurator - Safety options
    'cfg.opt.safe.parachute': 'Парашют самолета',
    'cfg.opt.safe.parachute.desc': 'Система спасательного парашюта',
    'cfg.opt.safe.tracker': 'Трекер полета',
    'cfg.opt.safe.tracker.desc': 'Устройство спутникового слежения',
    'cfg.opt.safe.beacon': 'Аварийный маяк',
    'cfg.opt.safe.beacon.desc': 'Персональный аварийный радиомаяк',
    'cfg.opt.safe.oxygen': 'Кислородная система',
    'cfg.opt.safe.oxygen.desc': 'Дополнительный кислород для высоты',
    'cfg.opt.safe.fire': 'Пожаротушение',
    'cfg.opt.safe.fire.desc': 'Обнаружение и тушение пожара двигателя',
    // Configurator - Package options
    'cfg.opt.pkg.training': 'Пакет обучения',
    'cfg.opt.pkg.training.desc': 'Переучивание пилота включено',
    'cfg.opt.pkg.maintenance': 'План обслуживания',
    'cfg.opt.pkg.maintenance.desc': 'Обслуживание на первый год',
    'cfg.opt.pkg.warranty': 'Расширенная гарантия',
    'cfg.opt.pkg.warranty.desc': '3 года расширенной гарантии',
    'cfg.opt.pkg.delivery': 'Доставка',
    'cfg.opt.pkg.delivery.desc': 'Перегон самолета к вам',
    'cfg.opt.pkg.insurance': 'Пакет страхования',
    'cfg.opt.pkg.insurance.desc': 'Страхование на первый год',
    'cfg.opt.pkg.hangar': 'Пакет ангара',
    'cfg.opt.pkg.hangar.desc': 'Помощь с арендой ангара',
    // Configurator - Pricing
    'cfg.pricing.note': 'Цены являются оценочными и могут измениться',
    // Workflow - Navigation
    'nav.workflow': 'Процесс',
    'dash.workflow': 'Мой прогресс',
    // Workflow - Steps: Configure
    'wf.step.configure.title': 'Конфигурация',
    'wf.step.configure.summary': 'Спроектируйте свой самолет в конфигураторе, выберите опции и утвердите спецификации.',
    'wf.step.configure.check.1': 'Выбор базовой модели',
    'wf.step.configure.check.2': 'Выбор экстерьера и интерьера',
    'wf.step.configure.check.3': 'Настройка авионики',
    'wf.step.configure.check.4': 'Добавление оборудования безопасности',
    'wf.step.configure.check.5': 'Проверка и сохранение конфигурации',
    // Workflow - Steps: Qualification
    'wf.step.qualification.title': 'Квалификация',
    'wf.step.qualification.summary': 'Подайте документы для квалификации покупателя и проверки соответствия.',
    'wf.step.qualification.check.1': 'Подача идентификационных документов',
    'wf.step.qualification.check.2': 'Подтверждение наличия средств',
    'wf.step.qualification.check.3': 'Заполнение регуляторной анкеты',
    'wf.step.qualification.check.4': 'Проверка пилотского свидетельства',
    'wf.step.qualification.check.5': 'Обзор требований авиавластей',
    'wf.step.qualification.check.6': 'Получение одобрения квалификации',
    // Workflow - Steps: Contract
    'wf.step.contract.title': 'Контракт',
    'wf.step.contract.summary': 'Изучите и подпишите договор купли-продажи, подтвердите условия оплаты и график поставки.',
    'wf.step.contract.check.1': 'Изучение договора купли-продажи',
    'wf.step.contract.check.2': 'Подтверждение графика платежей',
    'wf.step.contract.check.3': 'Подписание документов',
    'wf.step.contract.check.4': 'Внесение первоначального взноса',
    // Workflow - Steps: Build
    'wf.step.build.title': 'Производство',
    'wf.step.build.summary': 'Ваш самолет в производстве с регулярными обновлениями прогресса и отслеживанием этапов.',
    'wf.step.build.check.1': 'Производственный слот назначен',
    'wf.step.build.check.2': 'Сборка планера начата',
    'wf.step.build.check.3': 'Установка систем',
    'wf.step.build.check.4': 'Интеграция авионики',
    'wf.step.build.check.5': 'Завершение интерьера',
    'wf.step.build.check.6': 'Покраска и внешняя отделка',
    'wf.step.build.check.7': 'Финальная сборка завершена',
    // Workflow - Steps: QA
    'wf.step.qa.title': 'Контроль качества',
    'wf.step.qa.summary': 'Комплексное тестирование, инспекция и сертификация для обеспечения безопасности.',
    'wf.step.qa.check.1': 'Тестирование наземных систем',
    'wf.step.qa.check.2': 'Испытания двигателя',
    'wf.step.qa.check.3': 'Программа летных испытаний',
    'wf.step.qa.check.4': 'Подписание инспекции качества',
    'wf.step.qa.check.5': 'Сертификат летной годности',
    // Workflow - Steps: Training
    'wf.step.training.title': 'Обучение',
    'wf.step.training.summary': 'Переподготовка пилота и ознакомление с системами для безопасной эксплуатации.',
    'wf.step.training.check.1': 'Завершение наземной подготовки',
    'wf.step.training.check.2': 'Занятия на симуляторе',
    'wf.step.training.check.3': 'Часы летной подготовки',
    'wf.step.training.check.4': 'Обзор эксплуатации систем',
    'wf.step.training.check.5': 'Обучение аварийным процедурам',
    'wf.step.training.check.6': 'Проверочный полет и сертификация',
    // Workflow - Steps: Delivery
    'wf.step.delivery.title': 'Поставка',
    'wf.step.delivery.summary': 'Финальная приемка, передача документации и доставка самолета.',
    'wf.step.delivery.check.1': 'Финальная приемочная инспекция',
    'wf.step.delivery.check.2': 'Обзор пакета документации',
    'wf.step.delivery.check.3': 'Обработка финального платежа',
    'wf.step.delivery.check.4': 'Завершение передачи права собственности',
    'wf.step.delivery.check.5': 'Координация перегона или самовывоза',
    // Workflow - Steps: Service
    'wf.step.service.title': 'Обслуживание',
    'wf.step.service.summary': 'Постоянная поддержка технического обслуживания, гарантийный сервис и помощь владельцу.',
    'wf.step.service.check.1': 'Гарантийная регистрация завершена',
    'wf.step.service.check.2': 'График обслуживания установлен',
    'wf.step.service.check.3': 'Доступ к порталу поддержки',
    'wf.step.service.check.4': 'Первый сервис запланирован',
    // Workflow - Document labels
    'wf.doc.terms': 'Условия использования',
    'wf.doc.privacy': 'Политика конфиденциальности',
    'wf.doc.application': 'Форма заявки',
    'wf.doc.compliance': 'Соответствие нормативам',
    'wf.doc.dataRetention': 'Политика хранения данных',
    'wf.doc.qaStandards': 'Стандарты качества',
    'wf.doc.flightOps': 'Руководство по полетам',
    'wf.doc.platformManual': 'Руководство платформы',
    'wf.doc.security': 'Политика безопасности',
    'wf.doc.maintenance': 'Руководство по обслуживанию',
    // Workflow - UI labels
    'wf.progress': 'Прогресс',
    'wf.currentStep': 'Текущий этап',
    'wf.stepOf': 'Этап {n} из {total}',
    // Request - Status
    'req.status.draft': 'Черновик',
    'req.status.in_review': 'На рассмотрении',
    'req.status.scheduled': 'Запланировано',
    'req.status.in_progress': 'В процессе',
    'req.status.completed': 'Завершено',
    // Request - Stub titles
    'req.stub.config1.title': 'Конфигурация легкого спортивного',
    'req.stub.qualification1.title': 'Заказ стандартного туристического',
    'req.stub.build1.title': 'Сборка скоростного',
    'req.stub.training1.title': 'Пакет обучения представительского',
    'req.stub.completed1.title': 'Завершенная поставка',
    // Request - UI labels
    'req.noRequests': 'Пока нет заявок',
    'req.viewWorkflow': 'Смотреть процесс',
    'req.openConfigurator': 'Продолжить настройку',
    'req.openPresale': 'Смотреть пресейл',
    // Token - Sections
    'token.section.overview.title': 'Обзор токенизации',
    'token.section.overview.text': 'FlyANGT использует токенизацию как координационный слой для авиационных операций. Этот фреймворк обеспечивает прозрачное, проверяемое участие в экосистеме платформы без спекулятивных механизмов.',
    'token.section.overview.bullet.1': 'Механизм координации для участников платформы',
    'token.section.overview.bullet.2': 'Прозрачные правила в проверяемых смарт-контрактах',
    'token.section.overview.bullet.3': 'Операционная полезность, а не спекулятивный инструмент',
    'token.section.why.title': 'Зачем токенизация',
    'token.section.why.text': 'Традиционная координация в авиации опирается на фрагментированные системы и ручные процессы. Токенизация предоставляет единый фреймворк для отслеживания участия, верификации полномочий и координации деятельности в экосистеме.',
    'token.section.why.bullet.1': 'Единая координация авиационных услуг',
    'token.section.why.bullet.2': 'Верифицируемые записи об участии в платформе',
    'token.section.why.bullet.3': 'Снижение административных издержек',
    'token.section.why.bullet.4': 'Четкие, проверяемые правила управления',
    'token.section.utility.title': 'Полезность токена',
    'token.section.utility.text': 'Токены в экосистеме FlyANGT служат конкретным операционным целям. Они не предназначены как инвестиционные инструменты, а как функциональные единицы платформы.',
    'token.section.utility.bullet.1': 'Доступ к сервисам и функциям платформы',
    'token.section.utility.bullet.2': 'Участие в решениях по управлению',
    'token.section.utility.bullet.3': 'Координация сервисных сборов',
    'token.section.utility.bullet.4': 'Согласование стимулов экосистемы',
    'token.section.interaction.title': 'Взаимодействие с платформой',
    'token.section.interaction.text': 'Участники взаимодействуют с токенизационным слоем через платформу FlyANGT. Все операции подчиняются условиям платформы и применимым нормативам.',
    'token.section.interaction.bullet.1': 'Веб-интерфейс платформы',
    'token.section.interaction.bullet.2': 'Документированные процессы в Центре доверия',
    'token.section.interaction.bullet.3': 'Поддержка доступна через кабинет',
    'token.section.transparency.title': 'Прозрачность и соответствие',
    'token.section.transparency.text': 'Все правила и операции токенизации задокументированы в Центре доверия. Мы обеспечиваем прозрачность фреймворка при соблюдении применимых нормативов.',
    'token.section.transparency.bullet.1': 'Публичная документация всех правил',
    'token.section.transparency.bullet.2': 'Регулярные проверки соответствия',
    'token.section.transparency.bullet.3': 'Аудиторские следы всех операций',
    'token.section.whitepaper.title': 'Техническая документация',
    'token.section.whitepaper.text': 'Белая книга содержит детальную техническую документацию фреймворка токенизации, включая архитектуру, механизмы управления и операционные процедуры.',
    'token.section.risks.title': 'Раскрытие рисков',
    'token.section.risks.text': 'Участие в фреймворке токенизации FlyANGT сопряжено с рисками, которые участники должны понимать и принимать перед использованием платформы.',
    'token.section.risks.bullet.1': 'Токены не являются ценными бумагами и не представляют долю или собственность',
    'token.section.risks.bullet.2': 'Нет гарантированной доходности или финансовых результатов',
    'token.section.risks.bullet.3': 'Технологические риски, включая уязвимости смарт-контрактов',
    'token.section.risks.bullet.4': 'Регуляторная и рыночная среда могут измениться',
    // Token - CTAs
    'token.cta.reviewFramework': 'Обзор фреймворка',
    'token.cta.openWhitepaper': 'Открыть белую книгу',
    'token.cta.exploreParticipation': 'Узнать об участии',
    // Token - UI
    'token.readInTrust': 'Читать в Центре доверия',
    'token.riskDisclosure': 'Раскрытие рисков',
    // Partner - Types
    'partner.type.dealer': 'Дилер',
    'partner.type.mro': 'ТО и Р',
    'partner.type.hangar': 'Ангар',
    'partner.type.flight_school': 'Летная школа',
    'partner.type.marketing_pr': 'Маркетинг и PR',
    'partner.type.payments': 'Платежи',
    'partner.type.crm_support': 'CRM и поддержка',
    'partner.type.market_making': 'Маркет-мейкинг',
    'partner.type.integrator': 'Интегратор',
    // Partner - Regions
    'partner.region.cyprus': 'Кипр',
    'partner.region.eu': 'Европейский Союз',
    'partner.region.mena': 'MENA',
    'partner.region.global': 'Глобально',
    // Partner - Status
    'partner.status.planned': 'Планируется',
    'partner.status.active': 'Активен',
    'partner.status.pilot': 'Пилотный',
    // Partner - Services
    'partner.service.sales': 'Продажи',
    'partner.service.build_assist': 'Помощь в сборке',
    'partner.service.maintenance': 'Обслуживание',
    'partner.service.hangar_storage': 'Ангарное хранение',
    'partner.service.training': 'Обучение',
    'partner.service.payments': 'Платежи',
    'partner.service.crm': 'CRM',
    'partner.service.support': 'Поддержка',
    'partner.service.liquidity': 'Ликвидность',
    'partner.service.compliance': 'Соответствие',
    // Partner - Group labels
    'partner.group.offline': 'Офлайн-партнеры',
    'partner.group.digital': 'Цифровые партнеры',
    // Partner - Directory UI
    'partner.filter.all': 'Все',
    'partner.filter.type': 'Тип',
    'partner.filter.region': 'Регион',
    'partner.filter.services': 'Услуги',
    // Partner - Seed data
    'partner.aero_cyprus.headline': 'Официальный дилер воздушных судов на Кипре',
    'partner.aero_cyprus.description': 'Aero Cyprus Dealers является официальным дистрибьютором легких воздушных судов в регионе Кипр, обеспечивая полную поддержку цикла продаж от конфигурации до доставки.',
    'partner.aero_cyprus.highlight.1': 'Эксклюзивные права на территорию Кипра',
    'partner.aero_cyprus.highlight.2': 'Полная поддержка программы помощи в сборке',
    'partner.skybridge.headline': 'Европейская сеть продаж',
    'partner.skybridge.description': 'SkyBridge EU связывает покупателей по всей Западной Европе с самолетами FlyANGT, предлагая локализованную поддержку продаж и помощь с регулированием.',
    'partner.skybridge.highlight.1': 'Покрытие нескольких стран ЕС',
    'partner.gulf_aviation.headline': 'Партнер по продажам в регионе MENA',
    'partner.gulf_aviation.description': 'Gulf Aviation Sales представляет самолеты FlyANGT на рынках Ближнего Востока и Северной Африки с специализированной региональной экспертизой.',
    'partner.cyprus_aircraft.headline': 'ТО и Р с сертификатом EASA Part 145',
    'partner.cyprus_aircraft.description': 'Cyprus Aircraft Services предоставляет сертифицированные услуги по техническому обслуживанию, ремонту и капитальному ремонту самолетов FlyANGT с полным соответствием требованиям.',
    'partner.cyprus_aircraft.highlight.1': 'Сертификация EASA Part 145',
    'partner.cyprus_aircraft.highlight.2': 'Техники, обученные на заводе',
    'partner.eurotech.headline': 'Европейская сеть ТО и Р',
    'partner.eurotech.description': 'EuroTech MRO предлагает услуги технического обслуживания в аэропортах ЕС с мобильными командами и стационарными объектами.',
    'partner.larnaca_hangar.headline': 'Премиальные ангарные объекты',
    'partner.larnaca_hangar.description': 'Larnaca Hangar Solutions предоставляет безопасное хранение воздушных судов с климат-контролем вблизи международного аэропорта Ларнаки.',
    'partner.larnaca_hangar.highlight.1': 'Охрана и доступ 24/7',
    'partner.dubai_storage.headline': 'Сеть ангаров в MENA',
    'partner.dubai_storage.description': 'Dubai Sky Storage предлагает премиальные ангарные объекты в ключевых локациях MENA с консьерж-сервисом.',
    'partner.med_flight.headline': 'Лицензированная летная академия',
    'partner.med_flight.description': 'Mediterranean Flight Academy проводит обучение по типу для владельцев и пилотов воздушных судов FlyANGT.',
    'partner.med_flight.highlight.1': 'Сертификация по типу',
    'partner.med_flight.highlight.2': 'Тренажерная и летная подготовка',
    'partner.eu_pilot.headline': 'Европейский учебный центр',
    'partner.eu_pilot.description': 'EU Pilot Training Center предлагает курсы переподготовки пилотов и периодическое обучение в нескольких странах ЕС.',
    'partner.aviation_media.headline': 'Глобальный авиационный маркетинг',
    'partner.aviation_media.description': 'Aviation Media Global предоставляет маркетинговые, PR и медиа-услуги для экосистемы FlyANGT.',
    'partner.flyfi.headline': 'Платежные решения для авиации',
    'partner.flyfi.description': 'FlyFi Payments обеспечивает безопасную, соответствующую требованиям обработку платежей для авиационных транзакций и услуг платформы.',
    'partner.flyfi.highlight.1': 'Поддержка множества валют',
    'partner.aerocrm.headline': 'Платформа управления клиентами',
    'partner.aerocrm.description': 'AeroCRM Solutions предоставляет CRM и инфраструктуру поддержки для сети FlyANGT.',
    'partner.liquidity.headline': 'Провайдер ликвидности',
    'partner.liquidity.description': 'Liquidity Partners будет предоставлять услуги маркет-мейкинга для фреймворка токенизации FlyANGT.',
    'partner.skyconnect.headline': 'Услуги системной интеграции',
    'partner.skyconnect.description': 'SkyConnect Integrations разрабатывает пользовательские интеграции между платформой FlyANGT и сторонними авиационными системами.',
    'partner.mena_tech.headline': 'Технические решения для MENA',
    'partner.mena_tech.description': 'MENA Aviation Tech предоставляет локализованную техническую поддержку и системную интеграцию для региона MENA.',
    // Partner - Filter UI (additional)
    'partner.filter.allTypes': 'Все типы',
    'partner.filter.allRegions': 'Все регионы',
    'partner.viewProfile': 'Открыть профиль',
    // Investors - Sections
    'investors.section.thesis.title': 'Инвестиционный тезис',
    'investors.section.thesis.text': 'FlyANGT решает структурную проблему в малой авиации: владельцы кит-самолетов не имеют координированного доступа к сертифицированным услугам.',
    'investors.section.thesis.bullet.1': 'Кит-самолеты представляют растущий сегмент с недостаточно обслуживаемыми потребностями',
    'investors.section.thesis.bullet.2': 'Фрагментированный ландшафт услуг создает трение для владельцев и партнеров',
    'investors.section.thesis.bullet.3': 'Платформенный подход обеспечивает масштабируемую координацию без значительных активов',
    'investors.section.market.title': 'Рыночная возможность',
    'investors.section.market.text': 'Рынок кит-самолетов продолжает расширяться глобально, движимый ценовыми преимуществами и регуляторными изменениями.',
    'investors.section.market.bullet.1': 'Рост регистраций кит-самолетов в Европе, MENA и развивающихся рынках',
    'investors.section.market.bullet.2': 'Ограниченное количество институциональных провайдеров для этой категории ВС',
    'investors.section.market.bullet.3': 'Потенциал регулярного дохода от обслуживания, обучения и услуг соответствия',
    'investors.section.market.bullet.4': 'Сетевые эффекты по мере роста партнерской экосистемы и базы пользователей',
    'investors.section.stack.title': 'Продуктовый стек',
    'investors.section.stack.text': 'FlyANGT использует гибридную модель, объединяющую офлайн авиационные услуги с возможностями цифровой платформы.',
    'investors.section.stack.bullet.1': 'Build Assist: Сопровождаемая сборка с контролем сертифицированных техников',
    'investors.section.stack.bullet.2': 'Сеть услуг: Координация MRO, ангаров и учебных партнеров',
    'investors.section.stack.bullet.3': 'Цифровая платформа: Управление процессами, документами, отслеживание соответствия',
    'investors.section.stack.bullet.4': 'Токен-слой: Утилитарный токен для услуг платформы и участия в экосистеме',
    'investors.section.revenue.title': 'Модель дохода',
    'investors.section.revenue.text': 'Множественные потоки дохода от офлайн-услуг и операций цифровой платформы.',
    'investors.section.revenue.bullet.1': 'Сервисные сборы от программ Build Assist и консультаций',
    'investors.section.revenue.bullet.2': 'Партнерские реферальные и координационные сборы',
    'investors.section.revenue.bullet.3': 'Подписка и транзакционные сборы платформы',
    'investors.section.revenue.bullet.4': 'Сборы за использование токена и участие в экосистеме',
    'investors.section.revenue.bullet.5': 'Сборы за программы обучения и сертификации',
    'investors.section.unit_economics.title': 'Что мы валидируем',
    'investors.section.unit_economics.text': 'Наша система юнит-экономики фокусируется на валидации ключевых операционных и финансовых метрик.',
    'investors.section.unit_economics.bullet.1': 'Стоимость привлечения клиента относительно пожизненной ценности',
    'investors.section.unit_economics.bullet.2': 'Устойчивость маржи услуг по партнерской сети',
    'investors.section.unit_economics.bullet.3': 'Метрики вовлеченности и удержания платформы',
    'investors.section.unit_economics.bullet.4': 'Скорость оборота токена и паттерны принятия утилиты',
    'investors.section.unit_economics.bullet.5': 'Темпы роста и удержания партнерской сети',
    'investors.section.presale_plan.title': 'От пресейла до листинга',
    'investors.section.presale_plan.text': 'Структурированная 10-недельная программа от пресейла токена до листинга на бирже.',
    'investors.section.presale_plan.bullet.1': 'Фаза 1: Запуск пресейла с преимуществами для ранних участников',
    'investors.section.presale_plan.bullet.2': 'Фаза 2: Построение сообщества и развитие экосистемы',
    'investors.section.presale_plan.bullet.3': 'Фаза 3: Развертывание функций платформы и онбординг партнеров',
    'investors.section.presale_plan.bullet.4': 'Фаза 4: Верификация соответствия и завершение аудита',
    'investors.section.presale_plan.bullet.5': 'Фаза 5: Листинг на бирже и обеспечение ликвидности',
    'investors.section.presale_plan.cta': 'Детали пресейла',
    'investors.section.token_role.title': 'Утилита токена',
    'investors.section.token_role.text': 'Токен ANGT служит утилитарным слоем для услуг платформы, а не спекулятивным инвестиционным инструментом.',
    'investors.section.token_role.bullet.1': 'Механизм доступа к услугам и скидок внутри платформы',
    'investors.section.token_role.bullet.2': 'Участие в экосистеме и сигнализация управления',
    'investors.section.token_role.bullet.3': 'Выравнивание стимулов партнеров и пользователей',
    'investors.section.token_role.cta': 'Узнать о токенизации',
    'investors.section.trust.title': 'Прозрачность',
    'investors.section.trust.text': 'Вся документация, отчеты о соответствии и операционные детали доступны в нашем Центре доверия.',
    'investors.section.trust.cta': 'Открыть Центр доверия',
    'investors.section.cta.title': 'Получите полную картину',
    'investors.section.cta.text': 'Запросите нашу презентацию для инвесторов с детальной информацией о рыночном анализе, финансовых прогнозах и команде.',
    // Investors - Metrics
    'investors.metric.cac.label': 'Стоимость привлечения клиента',
    'investors.metric.cac.note': 'Затраты на привлечение квалифицированного владельца ВС',
    'investors.metric.conversion.label': 'Конверсия',
    'investors.metric.conversion.note': 'Конверсия лида в платящего клиента',
    'investors.metric.margin.label': 'Валовая маржа',
    'investors.metric.margin.note': 'Целевая маржа услуг и платформы',
    'investors.metric.service_utilization.label': 'Утилизация услуг',
    'investors.metric.service_utilization.note': 'Коэффициент загрузки мощностей партнеров',
    'investors.metric.ltv.label': 'Пожизненная ценность',
    'investors.metric.ltv.note': 'Общая ценность клиента за время отношений',
    'investors.metric.build_assist_capacity.label': 'Емкость Build Assist',
    'investors.metric.build_assist_capacity.note': 'Емкость параллельных проектов',
    'investors.metric.nps.label': 'Net Promoter Score',
    'investors.metric.nps.note': 'Индикатор удовлетворенности клиентов',
    'investors.metric.warranty_claims.label': 'Гарантийные обращения',
    'investors.metric.warranty_claims.note': 'Индикатор качества услуг',
    'investors.metric.training_attach.label': 'Attach Rate обучения',
    'investors.metric.training_attach.note': 'Конверсия допродажи обучения',
    'investors.metric.token_velocity.label': 'Скорость токена',
    'investors.metric.token_velocity.note': 'Утилита и циркуляция токена',
    'investors.metric.partner_retention.label': 'Удержание партнеров',
    'investors.metric.partner_retention.note': 'Годовой показатель удержания партнеров',
    'investors.metric.platform_gmv.label': 'GMV платформы',
    'investors.metric.platform_gmv.note': 'Индикатор валового объема товаров',
    // Customers - Sections
    'customers.section.what_you_get.title': 'Что вы получаете',
    'customers.section.what_you_get.text': 'FlyANGT предоставляет полный набор ценностей для владения кит-самолетом.',
    'customers.section.what_you_get.bullet.1': 'Сопровождаемая сборка с чек-листами и фотоотчетами',
    'customers.section.what_you_get.bullet.2': 'Доступ к сертифицированным MRO партнерам и ангарам',
    'customers.section.what_you_get.bullet.3': 'Переподготовка пилотов и программы повышения квалификации',
    'customers.section.what_you_get.bullet.4': 'Цифровое управление документацией и соответствием',
    'customers.section.what_you_get.bullet.5': 'Прозрачный процесс с отслеживанием этапов',
    'customers.section.why_owner_assisted.title': 'Почему сборка с участием владельца',
    'customers.section.why_owner_assisted.text': 'Сборка собственного самолета создает более глубокую связь и понимание.',
    'customers.section.why_owner_assisted.bullet.1': 'Пошаговое руководство с контролем сертифицированных техников',
    'customers.section.why_owner_assisted.bullet.2': 'Фотоотчеты и документация каждого этапа',
    'customers.section.why_owner_assisted.bullet.3': 'Контрольные точки качества, проверенные профессионалами',
    'customers.section.journey.title': 'Ваш путь',
    'customers.section.journey.text': 'От первоначального интереса до полета мы сопровождаем вас на каждом этапе.',
    'customers.section.service.title': 'Сервис и обслуживание',
    'customers.section.service.text': 'Наша партнерская сеть обеспечивает комплексное техническое обслуживание.',
    'customers.section.service.bullet.1': 'Плановые проверки A/B/C с сертифицированными техниками',
    'customers.section.service.bullet.2': 'Поставка запчастей через проверенных поставщиков',
    'customers.section.service.bullet.3': 'Координация и поддержка гарантийных обращений',
    'customers.section.service.bullet.4': 'Отслеживание истории обслуживания в цифровом кабинете',
    'customers.section.service.bullet.5': 'Экстренная поддержка и помощь AOG',
    'customers.section.training.title': 'Обучение и безопасность',
    'customers.section.training.text': 'Комплексные программы обучения для безопасной эксплуатации.',
    'customers.section.training.bullet.1': 'Переподготовка по типу с сертифицированными инструкторами',
    'customers.section.training.bullet.2': 'Культура решений go/no-go и оценка погоды',
    'customers.section.training.bullet.3': 'Аварийные процедуры и сценарное обучение',
    'customers.section.training.bullet.4': 'Программы повышения квалификации и проверки навыков',
    'customers.section.ownership.title': 'Модели владения',
    'customers.section.ownership.text': 'Различные способы владения и эксплуатации самолета.',
    'customers.section.digital_cabinet.title': 'Цифровой кабинет',
    'customers.section.digital_cabinet.text': 'Вся документация на самолет на одной защищенной платформе.',
    'customers.section.digital_cabinet.bullet.1': 'Централизованное хранение документов с контролем версий',
    'customers.section.digital_cabinet.bullet.2': 'Отслеживание сервисных запросов и истории',
    'customers.section.digital_cabinet.bullet.3': 'Прямая связь с партнерами и поддержкой',
    'customers.section.digital_cabinet.bullet.4': 'Мониторинг соответствия и напоминания о продлении',
    'customers.section.request_docs.title': 'Получить информацию',
    'customers.section.request_docs.text': 'Запросите детальную документацию о наших программах.',
    'customers.section.cta.title': 'Готовы начать?',
    'customers.section.cta.text': 'Начните путь владения самолетом с FlyANGT.',
    // Home page
    'home.paths.title': 'Выберите свой путь',
    'home.paths.text': 'Выберите свою роль для получения релевантной информации.',
    'home.modules.title': 'Модули платформы',
    'home.modules.text': 'Изучите экосистему FlyANGT.',
    'home.trust.title': 'Центр доверия',
    'home.trust.text': 'Доступ к документам соответствия и политикам.',
    'home.workflow.title': 'От заказа до полета',
    'home.workflow.text': 'Изучите полный путь.',
    'home.quick.title': 'Быстрые действия',
    'home.quick.text': 'Переходите к ключевым разделам.',
    'home.updates.title': 'Последние обновления',
    'home.updates.text': 'Недавние анонсы.',
    // Generic UI labels
    'ui.back': 'Назад',
    'ui.open': 'Открыть',
    'ui.search': 'Поиск',
    'ui.filter': 'Фильтр',
    'ui.reset': 'Сброс',
    'ui.save': 'Сохранить',
    'ui.submit': 'Отправить',
    'ui.cancel': 'Отмена',
    'ui.close': 'Закрыть',
    'ui.loading': 'Загрузка...',
    'ui.error': 'Ошибка',
    'ui.success': 'Успешно',
    'ui.viewAll': 'Смотреть все',
    'ui.showMore': 'Показать больше',
    'ui.showLess': 'Показать меньше',
    // Release checklist (dev tool)
    'nav.release': 'Релиз',
    'release.title': 'Чек-лист релиза',
    'release.subtitle': 'Отслеживание готовности релиза по модулям',
    'release.filters.status': 'Статус',
    'release.filters.priority': 'Приоритет',
    'release.filters.module': 'Модуль',
    'release.status.todo': 'К выполнению',
    'release.status.in_progress': 'В процессе',
    'release.status.blocked': 'Заблокировано',
    'release.status.done': 'Готово',
    'release.status.na': 'Н/П',
    'release.priority.p0': 'P0 Критический',
    'release.priority.p1': 'P1 Высокий',
    'release.priority.p2': 'P2 Средний',
    'release.actions.reset': 'Сбросить все',
    'release.actions.export': 'Экспорт JSON',
    'release.actions.collapseAll': 'Свернуть все',
    'release.actions.expandAll': 'Развернуть все',
    'release.notes.placeholder': 'Добавить заметку...',
    'release.empty.title': 'Нет элементов',
    'release.empty.text': 'Нет элементов, соответствующих фильтрам.',
    'release.progress.label': 'Прогресс',
    'release.progress.complete': 'Завершено',
    // Release module titles
    'release.module.home.title': 'Главная',
    'release.module.trust.title': 'Центр доверия',
    'release.module.presale.title': 'Пресейл',
    'release.module.configurator.title': 'Конфигуратор',
    'release.module.workflow.title': 'Процесс',
    'release.module.token.title': 'Токен',
    'release.module.partners.title': 'Партнеры',
    'release.module.investors.title': 'Инвесторы',
    'release.module.customers.title': 'Клиенты',
    'release.module.dashboard.title': 'Кабинет',
    'release.module.i18n.title': 'I18n',
    'release.module.ux.title': 'UX',
    // Release check titles - Home
    'release.check.home-no-hardcoded.title': 'Нет жестко заданных строк',
    'release.check.home-i18n-coverage.title': 'EN/RU покрытие i18n',
    'release.check.home-nav-links.title': 'Навигация работает',
    'release.check.home-responsive.title': 'Адаптивная верстка',
    'release.check.home-module-cards.title': 'Карточки модулей',
    'release.check.home-pathway-links.title': 'Карточки путей',
    // Release check titles - Trust
    'release.check.trust-no-hardcoded.title': 'Нет жестко заданных строк',
    'release.check.trust-i18n-coverage.title': 'EN/RU покрытие i18n',
    'release.check.trust-filter-works.title': 'Фильтр категорий',
    'release.check.trust-search-works.title': 'Поиск работает',
    'release.check.trust-empty-state.title': 'Пустое состояние',
    'release.check.trust-doc-links.title': 'Ссылки документов',
    'release.check.trust-detail-pages.title': 'Детальные страницы',
    'release.check.trust-restricted-badge.title': 'Бейдж ограничения',
    // Release check titles - Presale
    'release.check.presale-no-hardcoded.title': 'Нет жестко заданных строк',
    'release.check.presale-i18n-coverage.title': 'EN/RU покрытие i18n',
    'release.check.presale-disabled-state.title': 'Отключенное состояние',
    'release.check.presale-config-toggle.title': 'Переключатель конфига',
    'release.check.presale-calculator.title': 'Калькулятор работает',
    'release.check.presale-form-validation.title': 'Валидация формы',
    'release.check.presale-week-ladder.title': 'Лестница недель',
    // Release check titles - Configurator
    'release.check.cfg-no-hardcoded.title': 'Нет жестко заданных строк',
    'release.check.cfg-i18n-coverage.title': 'EN/RU покрытие i18n',
    'release.check.cfg-disabled-state.title': 'Отключенное состояние',
    'release.check.cfg-config-toggle.title': 'Переключатель конфига',
    'release.check.cfg-group-nav.title': 'Навигация по группам',
    'release.check.cfg-option-select.title': 'Выбор опций',
    'release.check.cfg-price-calc.title': 'Расчет цены',
    'release.check.cfg-summary-panel.title': 'Панель итогов',
    // Release check titles - Workflow
    'release.check.wf-no-hardcoded.title': 'Нет жестко заданных строк',
    'release.check.wf-i18n-coverage.title': 'EN/RU покрытие i18n',
    'release.check.wf-step-navigation.title': 'Навигация по шагам',
    'release.check.wf-step-detail.title': 'Детали шагов',
    'release.check.wf-doc-links.title': 'Ссылки документов',
    'release.check.wf-progress-display.title': 'Индикатор прогресса',
    'release.check.wf-checklist-items.title': 'Элементы чек-листа',
    // Release check titles - Token
    'release.check.token-no-hardcoded.title': 'Нет жестко заданных строк',
    'release.check.token-i18n-coverage.title': 'EN/RU покрытие i18n',
    'release.check.token-disabled-state.title': 'Отключенное состояние',
    'release.check.token-sections.title': 'Все секции',
    'release.check.token-risk-disclosure.title': 'Раскрытие рисков',
    'release.check.token-cta-links.title': 'CTA ссылки',
    // Release check titles - Partners
    'release.check.partners-no-hardcoded.title': 'Нет жестко заданных строк',
    'release.check.partners-i18n-coverage.title': 'EN/RU покрытие i18n',
    'release.check.partners-filter-works.title': 'Фильтры работают',
    'release.check.partners-empty-state.title': 'Пустое состояние',
    'release.check.partners-detail-pages.title': 'Детали партнеров',
    'release.check.partners-map-display.title': 'Отображение карты',
    'release.check.partners-service-chips.title': 'Чипы услуг',
    // Release check titles - Investors
    'release.check.inv-no-hardcoded.title': 'Нет жестко заданных строк',
    'release.check.inv-i18n-coverage.title': 'EN/RU покрытие i18n',
    'release.check.inv-sections.title': 'Все секции',
    'release.check.inv-metrics-display.title': 'Отображение метрик',
    'release.check.inv-cta-links.title': 'CTA ссылки',
    'release.check.inv-final-cta.title': 'Финальный CTA',
    // Release check titles - Customers
    'release.check.cust-no-hardcoded.title': 'Нет жестко заданных строк',
    'release.check.cust-i18n-coverage.title': 'EN/RU покрытие i18n',
    'release.check.cust-sections.title': 'Все секции',
    'release.check.cust-journey-display.title': 'Отображение пути',
    'release.check.cust-cta-links.title': 'CTA ссылки',
    'release.check.cust-final-cta.title': 'Финальный CTA',
    // Release check titles - Dashboard
    'release.check.dash-no-hardcoded.title': 'Нет жестко заданных строк',
    'release.check.dash-i18n-coverage.title': 'EN/RU покрытие i18n',
    'release.check.dash-nav-works.title': 'Навигация кабинета',
    'release.check.dash-role-guard.title': 'Защита по ролям',
    'release.check.dash-placeholder-pages.title': 'Страницы-заглушки',
    'release.check.dash-requests-list.title': 'Список заявок',
    'release.check.dash-localStorage.title': 'LocalStorage работает',
    // Release check titles - I18n
    'release.check.i18n-en-coverage.title': 'EN покрытие полное',
    'release.check.i18n-ru-coverage.title': 'RU покрытие полное',
    'release.check.i18n-lang-switch.title': 'Переключение языка',
    'release.check.i18n-url-param.title': 'URL параметр работает',
    'release.check.i18n-fallback.title': 'Fallback на EN',
    'release.check.i18n-audit-hidden.title': 'Аудит скрыт в проде',
    // Release check titles - UX
    'release.check.ux-design-tokens.title': 'Токены дизайна',
    'release.check.ux-ui-primitives.title': 'UI примитивы',
    'release.check.ux-empty-states.title': 'Пустые состояния',
    'release.check.ux-loading-states.title': 'Состояния загрузки',
    'release.check.ux-responsive.title': 'Адаптивный дизайн',
    'release.check.ux-dev-routes-hidden.title': 'Dev маршруты скрыты',
    'release.check.ux-no-api-calls.title': 'Нет внешних API',
    'release.check.ux-config-driven.title': 'Config-driven архитектура',
    // Prelaunch
    'prelaunch.banner': 'Контент заблокирован - Режим предзапуска',
    'prelaunch.draftsBlockedTitle': 'Черновики отключены',
    'prelaunch.draftsBlockedText': 'Сохранение черновиков отключено в режиме предзапуска. Ваш ввод не будет сохранен.',
    // Snapshot
    'snapshot.title': 'Снимок конфигурации',
    'snapshot.subtitle': 'Экспорт текущего состояния конфигурации',
    'snapshot.actions.download': 'Скачать JSON',
    'snapshot.actions.copy': 'Копировать',
    'snapshot.notice.devOnly': 'Эта страница доступна только в режиме разработки.',
    'snapshot.disabled': 'Экспорт снимков отключен в конфигурации.',
    'snapshot.copied': 'Скопировано в буфер',
    'snapshot.summary.mode': 'Режим предзапуска',
    'snapshot.summary.configs': 'Включено конфигов',
    'snapshot.summary.pages': 'Страницы контента',
    'snapshot.summary.generated': 'Сгенерировано',
    // Export Center
    'export.title': 'Центр экспорта',
    'export.subtitle': 'Загрузка артефактов конфигурации для релиза',
    'export.artifact.snapshot.title': 'Снимок конфигурации',
    'export.artifact.snapshot.text': 'Полное состояние конфигурации системы: маршруты, модули, метаданные.',
    'export.artifact.release.title': 'Готовность к релизу',
    'export.artifact.release.text': 'Текущее состояние чеклиста релиза с прогрессом и заметками.',
    'export.artifact.i18n.title': 'Отчет i18n',
    'export.artifact.i18n.text': 'Покрытие переводов и отсутствующие ключи по локалям.',
    'export.artifact.smoke.title': 'Ссылки для тестирования',
    'export.artifact.smoke.text': 'Список маршрутов для быстрой проверки в браузере.',
    'export.artifact.bundle.title': 'Полный экспорт',
    'export.artifact.bundle.text': 'Все артефакты в одном файле.',
    'export.actions.download': 'Скачать',
    'export.actions.copy': 'Копировать',
    'export.actions.copyDone': 'Скопировано',
    'export.notice.devOnly': 'Эта страница доступна только в режиме разработки.',
    'export.smoke.openAll': 'Открыть все',

    // Smoke test
    'smoke.title': 'Дымовое тестирование',
    'smoke.subtitle': 'Ручное тестирование всех маршрутов',
    'smoke.group.publicCore': 'Основные страницы',
    'smoke.group.trustCenter': 'Центр доверия',
    'smoke.group.presale': 'Пресейл',
    'smoke.group.configurator': 'Конфигуратор',
    'smoke.group.token': 'Токенизация',
    'smoke.group.partners': 'Партнёры',
    'smoke.group.investors': 'Инвесторы',
    'smoke.group.customers': 'Клиенты',
    'smoke.group.workflow': 'Рабочий процесс',
    'smoke.group.dashboardBasic': 'Панель управления',
    'smoke.group.devTools': 'Инструменты разработки',
    'smoke.status.untested': 'Не проверено',
    'smoke.status.pass': 'Пройдено',
    'smoke.status.fail': 'Провалено',
    'smoke.status.skip': 'Пропущено',
    'smoke.actions.markPass': 'Пройдено',
    'smoke.actions.markFail': 'Провалено',
    'smoke.actions.markSkip': 'Пропустить',
    'smoke.actions.reset': 'Сбросить',
    'smoke.actions.resetAll': 'Сбросить все',
    'smoke.actions.export': 'Экспорт результатов',
    'smoke.actions.openRoute': 'Открыть',
    'smoke.summary.total': 'Всего',
    'smoke.summary.passed': 'Пройдено',
    'smoke.summary.failed': 'Провалено',
    'smoke.summary.skipped': 'Пропущено',
    'smoke.summary.untested': 'Не проверено',
    'smoke.notice.devOnly': 'Эта страница доступна только в режиме разработки.',
    'smoke.notes.placeholder': 'Добавить заметки...',

    // Gate
    'gate.title': 'Предстартовый шлюз',
    'gate.subtitle': 'Обзор инструментов и готовности',
    'gate.summary.overall': 'Общий статус',
    'gate.summary.releaseP0': 'Релизные P0 задачи',
    'gate.summary.smokeP0': 'P0 дымовые тесты',
    'gate.summary.i18nMissing': 'Отсутствующие i18n ключи',
    'gate.summary.devTools': 'Инструменты разработки',
    'gate.actions.openRelease': 'Чеклист релиза',
    'gate.actions.openSmoke': 'Дымовые тесты',
    'gate.actions.openExport': 'Центр экспорта',
    'gate.actions.openSnapshot': 'Снимок',
    'gate.actions.openI18n': 'Аудит i18n',
    'gate.banner.message': 'Предстартовый шлюз открыт',
    'gate.status.green': 'Готово',
    'gate.status.yellow': 'В процессе',
    'gate.status.red': 'Заблокировано',
    'gate.notice.devOnly': 'Только для разработки. Не является границей безопасности.',

    // RC (Release Candidate)
    'rc.title': 'Менеджер релиз-кандидатов',
    'rc.subtitle': 'Создание и управление снимками релиз-кандидатов',
    'rc.notice.devOnly': 'Только для разработки. История RC в LocalStorage.',
    'rc.actions.create': 'Создать RC',
    'rc.actions.delete': 'Удалить',
    'rc.actions.select': 'Выбрать',
    'rc.actions.unselect': 'Отменить выбор',
    'rc.actions.download': 'Скачать',
    'rc.actions.copy': 'Копировать',
    'rc.actions.copyDone': 'Скопировано',
    'rc.actions.openGate': 'Открыть Gate',
    'rc.actions.openExport': 'Открыть Export',
    'rc.actions.openRelease': 'Открыть Release',
    'rc.actions.openSmoke': 'Открыть Smoke',
    'rc.list.title': 'История RC',
    'rc.list.empty.title': 'Нет релиз-кандидатов',
    'rc.list.empty.text': 'Создайте первый RC для захвата текущего состояния.',
    'rc.detail.title': 'Детали RC',
    'rc.fields.id': 'ID RC',
    'rc.fields.createdAt': 'Создан',
    'rc.fields.status': 'Статус',
    'rc.fields.selected': 'Выбран',
    'rc.status.green': 'Готов',
    'rc.status.yellow': 'В процессе',
    'rc.status.red': 'Заблокирован',
    'rc.artifact.snapshot': 'Снимок',
    'rc.artifact.bundle': 'Пакет',
    'rc.artifact.release': 'Состояние релиза',
    'rc.artifact.smoke': 'Состояние тестов',
    'rc.artifact.gate': 'Сводка Gate',
    'rc.confirmDelete.title': 'Удалить RC?',
    'rc.confirmDelete.text': 'Это действие нельзя отменить.',

    // RC Compare
    'rcCompare.title': 'Сравнение RC',
    'rcCompare.subtitle': 'Сравнение различий между релиз-кандидатами',
    'rcCompare.notice.devOnly': 'Только для разработки. Сравнивает сохраненные артефакты RC.',
    'rcCompare.select.a': 'RC A',
    'rcCompare.select.b': 'RC B',
    'rcCompare.actions.swap': 'Поменять',
    'rcCompare.actions.export': 'Экспорт различий',
    'rcCompare.actions.copy': 'Копировать',
    'rcCompare.actions.copyDone': 'Скопировано',
    'rcCompare.summary.title': 'Сводка сравнения',
    'rcCompare.summary.changedGroups': 'Измененные группы',
    'rcCompare.summary.totalChanges': 'Всего изменений',
    'rcCompare.group.routes.title': 'Маршруты',
    'rcCompare.group.modules.title': 'Модули',
    'rcCompare.group.home.title': 'Главная',
    'rcCompare.group.trust.title': 'Центр доверия',
    'rcCompare.group.workflow.title': 'Процесс',
    'rcCompare.group.tokenization.title': 'Токенизация',
    'rcCompare.group.presale.title': 'Пресейл',
    'rcCompare.group.configurator.title': 'Конфигуратор',
    'rcCompare.group.partners.title': 'Партнеры',
    'rcCompare.group.investors.title': 'Инвесторы',
    'rcCompare.group.customers.title': 'Клиенты',
    'rcCompare.group.i18n.title': 'i18n',
    'rcCompare.group.release.title': 'Состояние релиза',
    'rcCompare.group.smoke.title': 'Состояние тестов',
    'rcCompare.group.gate.title': 'Сводка Gate',
    'rcCompare.empty.title': 'Выберите два RC',
    'rcCompare.empty.text': 'Выберите два релиз-кандидата для сравнения.',
    'rcCompare.diff.added': 'Добавлено',
    'rcCompare.diff.removed': 'Удалено',
    'rcCompare.diff.changed': 'Изменено',
    'rcCompare.view.showOnlyChanged': 'Только измененные',
    'rcCompare.view.showAll': 'Показать все группы',

    // Changelog
    'changelog.title': 'Генератор журнала изменений',
    'changelog.subtitle': 'Создание заметок о релизе из различий RC',
    'changelog.notice.devOnly': 'Только для разработки. Детерминированное преобразование.',
    'changelog.select.a': 'От RC',
    'changelog.select.b': 'До RC',
    'changelog.actions.swap': 'Поменять',
    'changelog.actions.exportMd': 'Экспорт MD',
    'changelog.actions.exportJson': 'Экспорт JSON',
    'changelog.actions.copyEn': 'Копировать EN',
    'changelog.actions.copyRu': 'Копировать RU',
    'changelog.actions.copyDone': 'Скопировано',
    'changelog.view.languageLabel': 'Язык предпросмотра',
    'changelog.view.showJson': 'Показать JSON',
    'changelog.summary.title': 'Сводка',
    'changelog.summary.changedGroups': 'Измененные группы',
    'changelog.summary.totalItems': 'Всего элементов',
    'changelog.template.headerTitle': 'Журнал изменений',
    'changelog.template.added': 'Добавлено',
    'changelog.template.changed': 'Изменено',
    'changelog.template.removed': 'Удалено',
    'changelog.template.fixed': 'Исправлено',
    'changelog.template.notes': 'Заметки',
    'changelog.template.truncatedNote': '... и другие элементы',
    'changelog.empty.title': 'Выберите два RC',
    'changelog.empty.text': 'Выберите два релиз-кандидата для генерации журнала.',
    'changelog.group.routes.title': 'Маршруты',
    'changelog.group.modules.title': 'Модули',
    'changelog.group.home.title': 'Главная',
    'changelog.group.trust.title': 'Центр доверия',
    'changelog.group.workflow.title': 'Процесс',
    'changelog.group.tokenization.title': 'Токенизация',
    'changelog.group.presale.title': 'Пресейл',
    'changelog.group.configurator.title': 'Конфигуратор',
    'changelog.group.partners.title': 'Партнеры',
    'changelog.group.investors.title': 'Инвесторы',
    'changelog.group.customers.title': 'Клиенты',
    'changelog.group.i18n.title': 'Переводы',
    'changelog.group.release.title': 'Состояние релиза',
    'changelog.group.smoke.title': 'Дымовые тесты',
    'changelog.group.gate.title': 'Статус шлюза',

    // Release Notes
    'releaseNotes.title': 'Пакет заметок о релизе',
    'releaseNotes.subtitle': 'Генерация полной документации релиза',
    'releaseNotes.notice.devOnly': 'Только для разработки. Детерминированный шаблон.',
    'releaseNotes.select.a': 'От RC',
    'releaseNotes.select.b': 'До RC',
    'releaseNotes.actions.swap': 'Поменять',
    'releaseNotes.actions.exportMd': 'Экспорт MD',
    'releaseNotes.actions.exportJson': 'Экспорт JSON',
    'releaseNotes.actions.copyEn': 'Копировать EN',
    'releaseNotes.actions.copyRu': 'Копировать RU',
    'releaseNotes.actions.copyDone': 'Скопировано',
    'releaseNotes.view.languageLabel': 'Язык предпросмотра',
    'releaseNotes.sections.meta.title': 'Мета',
    'releaseNotes.sections.readiness.title': 'Готовность',
    'releaseNotes.sections.highlights.title': 'Основные изменения',
    'releaseNotes.sections.changelog.title': 'Журнал изменений',
    'releaseNotes.sections.quality.title': 'Сводка качества',
    'releaseNotes.sections.knownIssues.title': 'Известные проблемы',
    'releaseNotes.sections.links.title': 'Ссылки',
    'releaseNotes.sections.nextSteps.title': 'Следующие шаги',
    'releaseNotes.meta.generatedAt': 'Сгенерировано',
    'releaseNotes.meta.fromRc': 'От RC',
    'releaseNotes.meta.toRc': 'До RC',
    'releaseNotes.meta.status': 'Статус',
    'releaseNotes.readiness.overall': 'Общий статус',
    'releaseNotes.readiness.releaseP0': 'Релиз P0',
    'releaseNotes.readiness.smokeP0': 'Дымовые P0',
    'releaseNotes.readiness.i18nMissing': 'Отсутствуют i18n',
    'releaseNotes.quality.releaseChecklist': 'Чеклист релиза',
    'releaseNotes.quality.smokeChecklist': 'Дымовые тесты',
    'releaseNotes.knownIssues.add': 'Добавить проблему',
    'releaseNotes.knownIssues.edit': 'Редактировать',
    'releaseNotes.knownIssues.delete': 'Удалить',
    'releaseNotes.knownIssues.severityLabel': 'Критичность',
    'releaseNotes.knownIssues.ownerLabel': 'Ответственный',
    'releaseNotes.knownIssues.notesPlaceholder': 'Дополнительные заметки...',
    'releaseNotes.knownIssues.severity.low': 'Низкая',
    'releaseNotes.knownIssues.severity.medium': 'Средняя',
    'releaseNotes.knownIssues.severity.high': 'Высокая',
    'releaseNotes.knownIssues.empty': 'Нет известных проблем',
    'releaseNotes.links.open': 'Открыть',
    'releaseNotes.nextSteps.placeholder': 'Проверьте заметки о релизе с командой перед публикацией.',
    'releaseNotes.highlights.mostChanges': 'Больше всего изменений в',
    // Publish Center
    'publish.title': 'Центр публикации',
    'publish.subtitle': 'Сборка и управление пакетами публикации',
    'publish.notice.devOnly': 'Инструмент разработки — отключен в продакшене',
    'publish.selectRc.label': 'Выберите версию RC',
    'publish.actions.createPacket': 'Создать пакет',
    'publish.actions.savePacket': 'Сохранить пакет',
    'publish.actions.loadPacket': 'Загрузить пакет',
    'publish.actions.deletePacket': 'Удалить пакет',
    'publish.actions.download': 'Скачать',
    'publish.actions.downloadAll': 'Скачать всё',
    'publish.actions.copy': 'Копировать',
    'publish.actions.copyDone': 'Скопировано!',
    'publish.actions.generate': 'Сгенерировать',
    'publish.actions.regenerate': 'Перегенерировать',
    'publish.section.packet.title': 'Информация о пакете',
    'publish.section.files.title': 'Файлы публикации',
    'publish.section.checklist.title': 'Чеклист публикации',
    'publish.section.deployment.title': 'Шаги развёртывания',
    'publish.section.savedPackets.title': 'Сохранённые пакеты',
    'publish.file.rc_bundle.title': 'RC Bundle (полный)',
    'publish.file.rc_snapshot.title': 'Снапшот RC',
    'publish.file.rc_gate.title': 'Статус Gate',
    'publish.file.rc_release.title': 'Чеклист релиза',
    'publish.file.rc_smoke.title': 'Дымовые тесты',
    'publish.file.release_notes_en_md.title': 'Заметки о релизе (EN, Markdown)',
    'publish.file.release_notes_ru_md.title': 'Заметки о релизе (RU, Markdown)',
    'publish.file.release_notes_en_json.title': 'Заметки о релизе (EN, JSON)',
    'publish.file.release_notes_ru_json.title': 'Заметки о релизе (RU, JSON)',
    'publish.file.manifest.title': 'Манифест публикации',
    'publish.file.deployment_steps_en.title': 'Шаги развёртывания (EN)',
    'publish.file.deployment_steps_ru.title': 'Шаги развёртывания (RU)',
    'publish.file.publish_checklist.title': 'Чеклист публикации',
    'publish.check.gate_green.title': 'Статус Gate — GREEN',
    'publish.check.smoke_p0_pass.title': 'Все Smoke P0 тесты пройдены',
    'publish.check.release_p0_done.title': 'Все Release P0 задачи выполнены',
    'publish.check.i18n_complete.title': 'Все i18n переводы завершены',
    'publish.check.changelog_reviewed.title': 'Журнал изменений проверен командой',
    'publish.check.release_notes_reviewed.title': 'Заметки о релизе проверены',
    'publish.check.known_issues_documented.title': 'Известные проблемы задокументированы',
    'publish.check.deployment_steps_verified.title': 'Шаги развёртывания проверены',
    'publish.check.backup_created.title': 'Резервная копия продакшена создана',
    'publish.check.stakeholders_notified.title': 'Стейкхолдеры уведомлены',
    'publish.check.rollback_plan_ready.title': 'План отката готов',
    'publish.check.monitoring_configured.title': 'Мониторинг настроен',
    'publish.check.docs_updated.title': 'Документация обновлена',
    'publish.check.final_approval.title': 'Финальное одобрение получено',
    'publish.priority.p0': 'P0',
    'publish.priority.p1': 'P1',
    'publish.priority.p2': 'P2',
    'publish.deploy.step1.en': '1. Create production backup',
    'publish.deploy.step1.ru': '1. Создать резервную копию продакшена',
    'publish.deploy.step2.en': '2. Deploy to staging environment',
    'publish.deploy.step2.ru': '2. Развернуть на staging-окружении',
    'publish.deploy.step3.en': '3. Run smoke tests on staging',
    'publish.deploy.step3.ru': '3. Запустить дымовые тесты на staging',
    'publish.deploy.step4.en': '4. Deploy to production',
    'publish.deploy.step4.ru': '4. Развернуть на продакшене',
    'publish.deploy.step5.en': '5. Verify production deployment',
    'publish.deploy.step5.ru': '5. Проверить развёртывание на продакшене',
    'publish.deploy.step6.en': '6. Notify stakeholders of release',
    'publish.deploy.step6.ru': '6. Уведомить стейкхолдеров о релизе',
    'publish.packet.name.label': 'Название пакета',
    'publish.packet.name.placeholder': 'Введите название пакета...',
    'publish.packet.created.label': 'Создан',
    'publish.packet.status.draft': 'Черновик',
    'publish.packet.status.ready': 'Готов',
    'publish.packet.status.published': 'Опубликован',
    'publish.savedPackets.empty': 'Нет сохранённых пакетов',
    'publish.savedPackets.load': 'Загрузить',
    'publish.savedPackets.delete': 'Удалить',
    'publish.manifest.version': 'Версия',
    'publish.manifest.buildDate': 'Дата сборки',
    'publish.manifest.rcFrom': 'От RC',
    'publish.manifest.rcTo': 'До RC',
    // Post Release
    'postRelease.title': 'Отчет после релиза',
    'postRelease.subtitle': 'Генерация отчетов после релиза из пакетов публикации',
    'postRelease.notice.devOnly': 'Инструмент разработки - отключен в продакшене',
    'postRelease.selectPacket.label': 'Выберите пакет публикации',
    'postRelease.actions.newReport': 'Новый отчет',
    'postRelease.actions.save': 'Сохранить',
    'postRelease.actions.delete': 'Удалить',
    'postRelease.actions.exportMd': 'Экспорт MD',
    'postRelease.actions.exportJson': 'Экспорт JSON',
    'postRelease.actions.copyEn': 'Копировать EN',
    'postRelease.actions.copyRu': 'Копировать RU',
    'postRelease.actions.copyDone': 'Скопировано!',
    'postRelease.view.languageLabel': 'Язык предпросмотра',
    'postRelease.sections.meta.title': 'Мета',
    'postRelease.sections.deployment.title': 'Развертывание',
    'postRelease.sections.readiness.title': 'Готовность',
    'postRelease.sections.issues.title': 'Обнаруженные проблемы',
    'postRelease.sections.incidents.title': 'Инциденты',
    'postRelease.sections.actions.title': 'Задачи',
    'postRelease.sections.notes.title': 'Заметки',
    'postRelease.fields.releaseDate': 'Дата релиза',
    'postRelease.fields.environment': 'Окружение',
    'postRelease.fields.deployUrl': 'URL развертывания',
    'postRelease.fields.tagOrCommit': 'Тег или коммит',
    'postRelease.fields.gateStatus': 'Фактический статус Gate',
    'postRelease.fields.issuesFound': 'Обнаруженные проблемы',
    'postRelease.fields.incidents': 'Инциденты',
    'postRelease.fields.actionItems': 'Задачи',
    'postRelease.fields.owner': 'Ответственный',
    'postRelease.fields.due': 'Срок',
    'postRelease.fields.notes': 'Заметки',
    'postRelease.status.green': 'Зеленый',
    'postRelease.status.yellow': 'Желтый',
    'postRelease.status.red': 'Красный',
    'postRelease.env.prod': 'Продакшен',
    'postRelease.env.staging': 'Стейджинг',
    'postRelease.list.title': 'Сохраненные отчеты',
    'postRelease.list.empty.title': 'Нет отчетов',
    'postRelease.list.empty.text': 'Создайте отчет из пакета публикации, чтобы начать.',
    'postRelease.placeholder.none': 'нет',
    // Form Submission
    'form.submit.sending': 'Отправка...',
    'form.submit.success': 'Успешно отправлено!',
    'form.submit.successId': 'Номер заявки',
    'form.submit.error': 'Не удалось отправить. Попробуйте снова.',
    'form.submit.errorRetry': 'Повторить',
    'form.submit.button': 'Отправить',
    'form.submit.submitting': 'Отправка...',
    'form.validation.emailRequired': 'Email обязателен',
    'form.validation.emailInvalid': 'Введите корректный email',
    // Admin Viewer
    'admin.title': 'Админ-панель',
    'admin.subtitle': 'Просмотр и экспорт лидов и заявок',
    'admin.notice.devOnly': 'Только для разработки: эта страница недоступна в продакшене.',
    'admin.tabs.leads': 'Лиды',
    'admin.tabs.requests': 'Заявки',
    'admin.filters.source': 'Источник',
    'admin.filters.search': 'Поиск',
    'admin.filters.limit': 'Лимит',
    'admin.actions.export': 'Экспорт JSON',
    'admin.actions.copy': 'Копировать JSON',
    'admin.actions.copyDone': 'Скопировано!',
    'admin.actions.openApiLeads': 'Открыть API Лидов',
    'admin.actions.openApiRequests': 'Открыть API Заявок',
    'admin.list.empty.title': 'Нет записей',
    'admin.list.empty.text': 'Записи по указанным критериям не найдены.',
    'admin.detail.title': 'Детали записи',
    'admin.detail.rawJson': 'Исходный JSON',
    'admin.fields.id': 'ID',
    'admin.fields.createdAt': 'Создано',
    'admin.fields.updatedAt': 'Обновлено',
    'admin.fields.source': 'Источник',
    'admin.fields.email': 'Email',
    'admin.fields.name': 'Имя',
    'admin.fields.phone': 'Телефон',
    'admin.sources.presale': 'Пресейл',
    'admin.sources.configurator_quote': 'Конфигуратор',
    'admin.sources.partners': 'Партнеры',
    'admin.sources.investors_deck': 'Инвесторы',
    'admin.sources.customers_docs': 'Клиенты',
    // Admin workflow status
    'admin.status.label': 'Статус',
    'admin.status.new': 'Новый',
    'admin.status.reviewed': 'Просмотрен',
    'admin.status.contacted': 'Связались',
    'admin.status.closed': 'Закрыт',
    'admin.status.archived': 'В архиве',
    'admin.actions.saveStatus': 'Сохранить',
    'admin.actions.addNote': 'Добавить заметку',
    'admin.actions.archiveRecord': 'В архив',
    'admin.notes.title': 'Внутренние заметки',
    'admin.notes.empty': 'Заметок пока нет',
    'admin.notes.placeholder': 'Добавить заметку...',
    'admin.messages.saved': 'Сохранено',
    'admin.messages.error': 'Ошибка сохранения',
    // Migration Prep
    'migrate.title': 'Подготовка к миграции',
    'migrate.subtitle': 'Экспорт данных для миграции на Prisma/Postgres',
    'migrate.notice.devOnly': 'Только для разработки: эта страница недоступна в продакшене.',
    'migrate.section.export.title': 'Сырой экспорт',
    'migrate.section.seed.title': 'Экспорт для сидирования',
    'migrate.section.map.title': 'Карта миграции',
    'migrate.section.validation.title': 'Валидация данных',
    'migrate.actions.downloadRaw': 'Скачать сырой JSON',
    'migrate.actions.downloadSeed': 'Скачать Seed JSON',
    'migrate.actions.downloadMapJson': 'Скачать карту JSON',
    'migrate.actions.downloadMapMd': 'Скачать карту Markdown',
    'migrate.actions.downloadValidation': 'Скачать отчет валидации',
    'migrate.actions.copy': 'Копировать',
    'migrate.actions.copyDone': 'Скопировано!',
    'migrate.summary.leadsCount': 'Лиды',
    'migrate.summary.requestsCount': 'Заявки',
    'migrate.summary.notesCount': 'Внутренние заметки',
    'migrate.summary.tagsCount': 'Теги',
    'migrate.validation.title': 'Результаты валидации',
    'migrate.validation.invalidEmails': 'Неверные email',
    'migrate.validation.duplicates': 'Дубликаты email',
    'migrate.validation.missingFields': 'Отсутствуют обязательные поля',
    'migrate.validation.invalidStatuses': 'Неверные статусы',
    'migrate.validation.oversizedNotes': 'Слишком длинные заметки',
    'migrate.validation.warnings': 'Предупреждения',
    'migrate.validation.passed': 'Все проверки пройдены',

    // Storage mode
    'storage.mode.label': 'Хранилище',
    'storage.mode.config': 'Файловая БД',
    'storage.mode.prisma': 'Prisma',

    // Backup
    'backup.title': 'Резервное копирование',
    'backup.subtitle': 'Создание и восстановление резервных копий данных',
    'backup.notice.devOnly': 'Только для разработки: эта страница недоступна в продакшене.',
    'backup.section.create.title': 'Создать резервную копию',
    'backup.section.restore.title': 'Восстановить из копии',
    'backup.actions.create': 'Создать копию',
    'backup.actions.download': 'Скачать JSON',
    'backup.actions.copy': 'Копировать JSON',
    'backup.actions.validate': 'Проверить',
    'backup.actions.dryRun': 'Пробный запуск',
    'backup.actions.applyMerge': 'Применить слияние',
    'backup.actions.applyOverwrite': 'Применить перезапись',
    'backup.actions.copyDone': 'Скопировано!',
    'backup.fields.restoreMode': 'Режим восстановления',
    'backup.fields.pasteJsonPlaceholder': 'Вставьте JSON резервной копии...',
    'backup.summary.counts': 'Количество записей',
    'backup.report.created': 'Создано',
    'backup.report.updated': 'Обновлено',
    'backup.report.deleted': 'Удалено',
    'backup.report.errors': 'Ошибки',
    'backup.errors.tooLarge': 'Файл слишком большой. Максимальный размер 2МБ.',
    'backup.errors.invalidJson': 'Неверный формат JSON.',
    'backup.mode.merge': 'Слияние (upsert по ID)',
    'backup.mode.overwrite': 'Перезапись (сначала очистить все)',
    'backup.warning.overwrite': 'Внимание: режим перезаписи удалит все существующие данные перед восстановлением.',

    // Retention
    'retention.title': 'Хранение и архивация',
    'retention.subtitle': 'Архивирование старых записей по порогу возраста',
    'retention.notice.devOnly': 'Только для разработки: этот инструмент недоступен в продакшене.',
    'retention.actions.dryRun': 'Предпросмотр',
    'retention.actions.apply': 'Архивировать',
    'retention.fields.days': 'Старше (дней)',
    'retention.fields.includeNew': 'Включить статус "new"',
    'retention.report.title': 'Отчёт по хранению',
    'retention.report.eligibleCount': 'Подлежит архивации',
    'retention.report.bySource': 'По источнику',
    'retention.report.byStatus': 'По статусу',
    'retention.report.byAge': 'По возрасту',
    'retention.messages.applied': 'Успешно архивировано {count} записей.',
    'retention.messages.capped': 'Результаты ограничены до {max} записей. Сузьте критерии.',
    'retention.errors.tooMany': 'Слишком много записей ({count}). Максимум {max}. Используйте более строгие фильтры.',
    'retention.bucket.b0_7': '0-7 дней',
    'retention.bucket.b8_30': '8-30 дней',
    'retention.bucket.b31_90': '31-90 дней',
    'retention.bucket.b90': '90+ дней',

    // Admin - Retention
    'admin.retention.title': 'Хранение',
    'admin.retention.openTool': 'Открыть инструмент хранения',
    'admin.retention.daysLabel': 'Архивировать старше',
    'admin.retention.preview': 'Предпросмотр',
    'admin.retention.apply': 'Применить',

    // Forms - Unified Submit
    'forms.errors.unknownForm': 'Неизвестная форма',
    'forms.errors.validationFailed': 'Ошибка валидации',
    'forms.errors.serverError': 'Ошибка сервера',
    'forms.errors.invalidBody': 'Неверное тело запроса',
    'forms.errors.missingFormId': 'Отсутствует ID формы',
    'forms.errors.invalidLocale': 'Неверная локаль',
    'forms.errors.missingValues': 'Отсутствуют значения формы',
    'forms.submit.success': 'Успешно отправлено',
    'forms.submit.failed': 'Ошибка отправки',
    'forms.validation.required': 'Это поле обязательно',
    'forms.validation.invalidEmail': 'Неверный email адрес',

    // Forms - Customers Docs
    'forms.customersDocs.title': 'Запрос документации',
    'forms.customersDocs.description': 'Заполните форму ниже для запроса документации.',
    'forms.customersDocs.fields.name': 'Полное имя',
    'forms.customersDocs.fields.email': 'Email',
    'forms.customersDocs.fields.phone': 'Телефон',
    'forms.customersDocs.fields.country': 'Страна',
    'forms.customersDocs.fields.interest': 'Интерес',
    'forms.customersDocs.fields.notes': 'Дополнительные заметки',
    'forms.customersDocs.interest.ownership': 'Владение самолётом',
    'forms.customersDocs.interest.charter': 'Чартерные услуги',
    'forms.customersDocs.interest.maintenance': 'Техобслуживание',
    'forms.customersDocs.interest.other': 'Другое',
    'forms.customersDocs.submit': 'Отправить запрос',
    'forms.customersDocs.successTitle': 'Запрос отправлен',
    'forms.customersDocs.successText': 'Мы свяжемся с вами в ближайшее время.',

    // Forms - Anti-spam
    'forms.errors.tooLarge': 'Запрос слишком большой',
    'forms.errors.honeypot': 'Обнаружен спам',
    'forms.errors.rateLimited': 'Слишком много запросов. Повторите позже.',
    'forms.errors.banned': 'Временно заблокировано. Повторите позже.',
    'forms.errors.cooldown': 'Подождите перед повторной отправкой',
    'forms.cooldown.waitPrefix': 'Подождите',
    'forms.cooldown.seconds': '{n} секунд',
    'forms.honeypot.label': 'Компания',
  },
};

/**
 * Get translation by key and locale
 */
export function t(key: TranslationKey, locale: Locale = 'en'): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}

/**
 * Get locale config by code
 */
export function getLocale(code: string): LocaleConfig | undefined {
  return locales.find(l => l.code === code);
}

/**
 * Check if locale is supported
 */
export function isLocaleSupported(code: string): code is Locale {
  return locales.some(l => l.code === code);
}

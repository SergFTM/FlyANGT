/**
 * I18n Key Registry
 *
 * Defines all i18n keys used by each major module.
 * Used for auditing translation coverage.
 */

import { registerKeys } from './registry';

/**
 * Common UI keys used across multiple modules
 */
export const commonKeys = [
  // Navigation
  'nav.home',
  'nav.ecosystem',
  'nav.token',
  'nav.platform',
  'nav.partners',
  'nav.investors',
  'nav.customers',
  'nav.dashboard',
  'nav.presale',
  'nav.trust',
  'nav.configurator',
  'nav.workflow',
  // CTAs
  'cta.primary',
  'cta.secondary',
  'cta.learnMore',
  // Footer
  'footer.disclaimer',
  // Common
  'common.comingSoon',
  'common.moduleDisabled',
  'common.role',
  // Generic UI labels
  'ui.back',
  'ui.open',
  'ui.search',
  'ui.filter',
  'ui.reset',
  'ui.save',
  'ui.submit',
  'ui.cancel',
  'ui.close',
  'ui.loading',
  'ui.error',
  'ui.success',
  'ui.viewAll',
  'ui.showMore',
  'ui.showLess',
];

/**
 * Home page keys
 */
export const homeKeys = [
  'home.paths.title',
  'home.paths.text',
  'home.modules.title',
  'home.modules.text',
  'home.trust.title',
  'home.trust.text',
  'home.workflow.title',
  'home.workflow.text',
  'home.quick.title',
  'home.quick.text',
  'home.updates.title',
  'home.updates.text',
];

/**
 * Trust Center keys
 */
export const trustKeys = [
  // Categories
  'trust.category.legal',
  'trust.category.legal.desc',
  'trust.category.manuals',
  'trust.category.manuals.desc',
  'trust.category.maintenance',
  'trust.category.maintenance.desc',
  'trust.category.sales',
  'trust.category.sales.desc',
  'trust.category.quality',
  'trust.category.quality.desc',
  'trust.category.forms',
  'trust.category.forms.desc',
  'trust.category.policies',
  'trust.category.policies.desc',
  // Documents
  'trust.doc.terms.title',
  'trust.doc.terms.desc',
  'trust.doc.privacy.title',
  'trust.doc.privacy.desc',
  'trust.doc.platform-manual.title',
  'trust.doc.platform-manual.desc',
  'trust.doc.maintenance-guide.title',
  'trust.doc.maintenance-guide.desc',
  'trust.doc.sales-kit.title',
  'trust.doc.sales-kit.desc',
  'trust.doc.qa-standards.title',
  'trust.doc.qa-standards.desc',
  'trust.doc.partner-form.title',
  'trust.doc.partner-form.desc',
  'trust.doc.data-retention.title',
  'trust.doc.data-retention.desc',
  'trust.doc.flight-ops.title',
  'trust.doc.flight-ops.desc',
  'trust.doc.compliance.title',
  'trust.doc.compliance.desc',
  'trust.doc.investor-deck.title',
  'trust.doc.investor-deck.desc',
  'trust.doc.security.title',
  'trust.doc.security.desc',
  'trust.doc.whitepaper.title',
  'trust.doc.whitepaper.desc',
  // UI
  'trust.title',
  'trust.subtitle',
  'trust.search.placeholder',
  'trust.filter.all',
  'trust.filter.category',
  'trust.filter.type',
  'trust.sort.newest',
  'trust.sort.oldest',
  'trust.sort.name',
  'trust.noResults',
  'trust.docCount',
  'trust.version',
  'trust.lastUpdated',
  'trust.download',
  'trust.openLink',
  'trust.backToCatalog',
  'trust.keyPoints',
  'trust.restricted',
];

/**
 * Presale keys
 */
export const presaleKeys = [
  'presale.week.1',
  'presale.week.2',
  'presale.week.3',
  'presale.week.4',
  'presale.week.5',
  'presale.week.6',
  'presale.week.7',
  'presale.week.8',
  'presale.week.9',
  'presale.week.10',
  'presale.bonus.early',
  'presale.status.upcoming',
  'presale.status.active',
  'presale.status.completed',
];

/**
 * Configurator keys
 */
export const configuratorKeys = [
  // Groups
  'cfg.group.model',
  'cfg.group.model.desc',
  'cfg.group.exterior',
  'cfg.group.exterior.desc',
  'cfg.group.interior',
  'cfg.group.interior.desc',
  'cfg.group.avionics',
  'cfg.group.avionics.desc',
  'cfg.group.safety',
  'cfg.group.safety.desc',
  'cfg.group.packages',
  'cfg.group.packages.desc',
  // Model options
  'cfg.opt.model.light',
  'cfg.opt.model.light.desc',
  'cfg.opt.model.standard',
  'cfg.opt.model.standard.desc',
  'cfg.opt.model.performance',
  'cfg.opt.model.performance.desc',
  'cfg.opt.model.executive',
  'cfg.opt.model.executive.desc',
  // Exterior options
  'cfg.opt.ext.white',
  'cfg.opt.ext.silver',
  'cfg.opt.ext.blue',
  'cfg.opt.ext.black',
  'cfg.opt.ext.custom',
  'cfg.opt.ext.custom.desc',
  // Interior options
  'cfg.opt.int.standard',
  'cfg.opt.int.standard.desc',
  'cfg.opt.int.comfort',
  'cfg.opt.int.comfort.desc',
  'cfg.opt.int.executive',
  'cfg.opt.int.executive.desc',
  'cfg.opt.int.luxury',
  'cfg.opt.int.luxury.desc',
  // Avionics options
  'cfg.opt.avio.basic',
  'cfg.opt.avio.basic.desc',
  'cfg.opt.avio.advanced',
  'cfg.opt.avio.advanced.desc',
  'cfg.opt.avio.premium',
  'cfg.opt.avio.premium.desc',
  'cfg.opt.avio.integrated',
  'cfg.opt.avio.integrated.desc',
  // Safety options
  'cfg.opt.safe.parachute',
  'cfg.opt.safe.parachute.desc',
  'cfg.opt.safe.tracker',
  'cfg.opt.safe.tracker.desc',
  'cfg.opt.safe.beacon',
  'cfg.opt.safe.beacon.desc',
  'cfg.opt.safe.oxygen',
  'cfg.opt.safe.oxygen.desc',
  'cfg.opt.safe.fire',
  'cfg.opt.safe.fire.desc',
  // Package options
  'cfg.opt.pkg.training',
  'cfg.opt.pkg.training.desc',
  'cfg.opt.pkg.maintenance',
  'cfg.opt.pkg.maintenance.desc',
  'cfg.opt.pkg.warranty',
  'cfg.opt.pkg.warranty.desc',
  'cfg.opt.pkg.delivery',
  'cfg.opt.pkg.delivery.desc',
  'cfg.opt.pkg.insurance',
  'cfg.opt.pkg.insurance.desc',
  'cfg.opt.pkg.hangar',
  'cfg.opt.pkg.hangar.desc',
  // Pricing
  'cfg.pricing.note',
];

/**
 * Workflow keys
 */
export const workflowKeys = [
  'dash.workflow',
  // Steps
  'wf.step.configure.title',
  'wf.step.configure.summary',
  'wf.step.configure.check.1',
  'wf.step.configure.check.2',
  'wf.step.configure.check.3',
  'wf.step.configure.check.4',
  'wf.step.configure.check.5',
  'wf.step.qualification.title',
  'wf.step.qualification.summary',
  'wf.step.qualification.check.1',
  'wf.step.qualification.check.2',
  'wf.step.qualification.check.3',
  'wf.step.qualification.check.4',
  'wf.step.qualification.check.5',
  'wf.step.qualification.check.6',
  'wf.step.contract.title',
  'wf.step.contract.summary',
  'wf.step.contract.check.1',
  'wf.step.contract.check.2',
  'wf.step.contract.check.3',
  'wf.step.contract.check.4',
  'wf.step.build.title',
  'wf.step.build.summary',
  'wf.step.build.check.1',
  'wf.step.build.check.2',
  'wf.step.build.check.3',
  'wf.step.build.check.4',
  'wf.step.build.check.5',
  'wf.step.build.check.6',
  'wf.step.build.check.7',
  'wf.step.qa.title',
  'wf.step.qa.summary',
  'wf.step.qa.check.1',
  'wf.step.qa.check.2',
  'wf.step.qa.check.3',
  'wf.step.qa.check.4',
  'wf.step.qa.check.5',
  'wf.step.training.title',
  'wf.step.training.summary',
  'wf.step.training.check.1',
  'wf.step.training.check.2',
  'wf.step.training.check.3',
  'wf.step.training.check.4',
  'wf.step.training.check.5',
  'wf.step.training.check.6',
  'wf.step.delivery.title',
  'wf.step.delivery.summary',
  'wf.step.delivery.check.1',
  'wf.step.delivery.check.2',
  'wf.step.delivery.check.3',
  'wf.step.delivery.check.4',
  'wf.step.delivery.check.5',
  'wf.step.service.title',
  'wf.step.service.summary',
  'wf.step.service.check.1',
  'wf.step.service.check.2',
  'wf.step.service.check.3',
  'wf.step.service.check.4',
  // Document labels
  'wf.doc.terms',
  'wf.doc.privacy',
  'wf.doc.application',
  'wf.doc.compliance',
  'wf.doc.dataRetention',
  'wf.doc.qaStandards',
  'wf.doc.flightOps',
  'wf.doc.platformManual',
  'wf.doc.security',
  'wf.doc.maintenance',
  // UI labels
  'wf.progress',
  'wf.currentStep',
  'wf.stepOf',
];

/**
 * Token/Tokenization keys
 */
export const tokenKeys = [
  'token.section.overview.title',
  'token.section.overview.text',
  'token.section.overview.bullet.1',
  'token.section.overview.bullet.2',
  'token.section.overview.bullet.3',
  'token.section.why.title',
  'token.section.why.text',
  'token.section.why.bullet.1',
  'token.section.why.bullet.2',
  'token.section.why.bullet.3',
  'token.section.why.bullet.4',
  'token.section.utility.title',
  'token.section.utility.text',
  'token.section.utility.bullet.1',
  'token.section.utility.bullet.2',
  'token.section.utility.bullet.3',
  'token.section.utility.bullet.4',
  'token.section.interaction.title',
  'token.section.interaction.text',
  'token.section.interaction.bullet.1',
  'token.section.interaction.bullet.2',
  'token.section.interaction.bullet.3',
  'token.section.transparency.title',
  'token.section.transparency.text',
  'token.section.transparency.bullet.1',
  'token.section.transparency.bullet.2',
  'token.section.transparency.bullet.3',
  'token.section.whitepaper.title',
  'token.section.whitepaper.text',
  'token.section.risks.title',
  'token.section.risks.text',
  'token.section.risks.bullet.1',
  'token.section.risks.bullet.2',
  'token.section.risks.bullet.3',
  'token.section.risks.bullet.4',
  'token.cta.reviewFramework',
  'token.cta.openWhitepaper',
  'token.cta.exploreParticipation',
  'token.readInTrust',
  'token.riskDisclosure',
];

/**
 * Partners keys
 */
export const partnersKeys = [
  // Types
  'partner.type.dealer',
  'partner.type.mro',
  'partner.type.hangar',
  'partner.type.flight_school',
  'partner.type.marketing_pr',
  'partner.type.payments',
  'partner.type.crm_support',
  'partner.type.market_making',
  'partner.type.integrator',
  // Regions
  'partner.region.cyprus',
  'partner.region.eu',
  'partner.region.mena',
  'partner.region.global',
  // Status
  'partner.status.planned',
  'partner.status.active',
  'partner.status.pilot',
  // Services
  'partner.service.sales',
  'partner.service.build_assist',
  'partner.service.maintenance',
  'partner.service.hangar_storage',
  'partner.service.training',
  'partner.service.payments',
  'partner.service.crm',
  'partner.service.support',
  'partner.service.liquidity',
  'partner.service.compliance',
  // Groups
  'partner.group.offline',
  'partner.group.digital',
  // Directory UI
  'partner.filter.all',
  'partner.filter.type',
  'partner.filter.region',
  'partner.filter.services',
  'partner.filter.allTypes',
  'partner.filter.allRegions',
  'partner.viewProfile',
];

/**
 * Investors keys
 */
export const investorsKeys = [
  'investors.section.thesis.title',
  'investors.section.thesis.text',
  'investors.section.thesis.bullet.1',
  'investors.section.thesis.bullet.2',
  'investors.section.thesis.bullet.3',
  'investors.section.market.title',
  'investors.section.market.text',
  'investors.section.market.bullet.1',
  'investors.section.market.bullet.2',
  'investors.section.market.bullet.3',
  'investors.section.market.bullet.4',
  'investors.section.stack.title',
  'investors.section.stack.text',
  'investors.section.stack.bullet.1',
  'investors.section.stack.bullet.2',
  'investors.section.stack.bullet.3',
  'investors.section.stack.bullet.4',
  'investors.section.revenue.title',
  'investors.section.revenue.text',
  'investors.section.revenue.bullet.1',
  'investors.section.revenue.bullet.2',
  'investors.section.revenue.bullet.3',
  'investors.section.revenue.bullet.4',
  'investors.section.revenue.bullet.5',
  'investors.section.unit_economics.title',
  'investors.section.unit_economics.text',
  'investors.section.unit_economics.bullet.1',
  'investors.section.unit_economics.bullet.2',
  'investors.section.unit_economics.bullet.3',
  'investors.section.unit_economics.bullet.4',
  'investors.section.unit_economics.bullet.5',
  'investors.section.presale_plan.title',
  'investors.section.presale_plan.text',
  'investors.section.presale_plan.bullet.1',
  'investors.section.presale_plan.bullet.2',
  'investors.section.presale_plan.bullet.3',
  'investors.section.presale_plan.bullet.4',
  'investors.section.presale_plan.bullet.5',
  'investors.section.presale_plan.cta',
  'investors.section.token_role.title',
  'investors.section.token_role.text',
  'investors.section.token_role.bullet.1',
  'investors.section.token_role.bullet.2',
  'investors.section.token_role.bullet.3',
  'investors.section.token_role.cta',
  'investors.section.trust.title',
  'investors.section.trust.text',
  'investors.section.trust.cta',
  'investors.section.cta.title',
  'investors.section.cta.text',
];

/**
 * Customers keys
 */
export const customersKeys = [
  'customers.section.what_you_get.title',
  'customers.section.what_you_get.text',
  'customers.section.what_you_get.bullet.1',
  'customers.section.what_you_get.bullet.2',
  'customers.section.what_you_get.bullet.3',
  'customers.section.what_you_get.bullet.4',
  'customers.section.what_you_get.bullet.5',
  'customers.section.why_owner_assisted.title',
  'customers.section.why_owner_assisted.text',
  'customers.section.why_owner_assisted.bullet.1',
  'customers.section.why_owner_assisted.bullet.2',
  'customers.section.why_owner_assisted.bullet.3',
  'customers.section.journey.title',
  'customers.section.journey.text',
  'customers.section.service.title',
  'customers.section.service.text',
  'customers.section.service.bullet.1',
  'customers.section.service.bullet.2',
  'customers.section.service.bullet.3',
  'customers.section.service.bullet.4',
  'customers.section.service.bullet.5',
  'customers.section.training.title',
  'customers.section.training.text',
  'customers.section.training.bullet.1',
  'customers.section.training.bullet.2',
  'customers.section.training.bullet.3',
  'customers.section.training.bullet.4',
  'customers.section.ownership.title',
  'customers.section.ownership.text',
  'customers.section.digital_cabinet.title',
  'customers.section.digital_cabinet.text',
  'customers.section.digital_cabinet.bullet.1',
  'customers.section.digital_cabinet.bullet.2',
  'customers.section.digital_cabinet.bullet.3',
  'customers.section.digital_cabinet.bullet.4',
  'customers.section.request_docs.title',
  'customers.section.request_docs.text',
  'customers.section.cta.title',
  'customers.section.cta.text',
];

/**
 * Dashboard keys
 */
export const dashboardKeys = [
  'dash.overview',
  'dash.documents',
  'dash.requests',
  'dash.support',
  'dash.settings',
  'dash.accessDenied.title',
  'dash.accessDenied.text',
  'dash.placeholder.title',
  'dash.placeholder.text',
  // Request status
  'req.status.draft',
  'req.status.in_review',
  'req.status.scheduled',
  'req.status.in_progress',
  'req.status.completed',
  'req.noRequests',
  'req.viewWorkflow',
  'req.openConfigurator',
  'req.openPresale',
];

/**
 * Initialize all key registrations
 * Called once at app startup
 */
export function initializeKeyRegistry(): void {
  registerKeys('common', commonKeys);
  registerKeys('home', homeKeys);
  registerKeys('trust', trustKeys);
  registerKeys('presale', presaleKeys);
  registerKeys('configurator', configuratorKeys);
  registerKeys('workflow', workflowKeys);
  registerKeys('token', tokenKeys);
  registerKeys('partners', partnersKeys);
  registerKeys('investors', investorsKeys);
  registerKeys('customers', customersKeys);
  registerKeys('dashboard', dashboardKeys);
}

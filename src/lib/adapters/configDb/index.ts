/**
 * Config DB Adapter
 *
 * Exports all config-based repository implementations.
 */

export { getConfigLeadRepository, ConfigLeadRepository } from './leads.configRepo';
export { getConfigRequestRepository, ConfigRequestRepository } from './requests.configRepo';
export * from './configDb.paths';
export * from './configDb.utils';

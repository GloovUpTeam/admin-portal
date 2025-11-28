
export type RenewalType = 'domain' | 'hosting' | 'certificate';
export type RenewalEnv = 'prod' | 'staging' | 'dev';

export interface DomainRenewal {
  id: string;
  domain: string;
  env: RenewalEnv;
  type: RenewalType;
  renewDate: string;
  daysLeft: number;
  provider: string;
  cost: number;
}

export const mockDomainRenewals: DomainRenewal[] = [
  { id: 'd1', domain: 'gloovup.com', env: 'prod', type: 'domain', renewDate: '2023-11-15', daysLeft: 5, provider: 'GoDaddy', cost: 15 },
  { id: 'd2', domain: 'api.gloovup.com', env: 'prod', type: 'certificate', renewDate: '2023-11-20', daysLeft: 10, provider: 'AWS ACM', cost: 0 },
  { id: 'd3', domain: 'staging.gloovup.io', env: 'staging', type: 'hosting', renewDate: '2023-12-05', daysLeft: 25, provider: 'Vercel', cost: 20 },
  { id: 'd4', domain: 'dev.portal.net', env: 'dev', type: 'domain', renewDate: '2024-01-15', daysLeft: 65, provider: 'Namecheap', cost: 12 },
  { id: 'd5', domain: 'legacy-app.com', env: 'prod', type: 'hosting', renewDate: '2023-11-12', daysLeft: 2, provider: 'DigitalOcean', cost: 50 },
  { id: 'd6', domain: 'gloov-internal.net', env: 'prod', type: 'certificate', renewDate: '2024-03-01', daysLeft: 110, provider: 'LetsEncrypt', cost: 0 },
];

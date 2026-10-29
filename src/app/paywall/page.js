import Paywall from '@/components/Paywall';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Premium access · The Last Ever Apology, Truly'
};

export default function PaywallPage() {
  return <Paywall until={process.env.PAYWALL_UNTIL || null} />;
}

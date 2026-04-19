import { useSettings } from '../../hooks/useSettings';
import Nav from './Nav';
import Hero from './Hero';
import Menu from './Menu';
import Combos from './Combos';
import Hours from './Hours';
import Location from './Location';
import Footer from './Footer';
import ConfigNotice from './ConfigNotice';

export default function CustomerSite() {
  const { settings } = useSettings();
  return (
    <>
      <Nav phone={settings.phone} />
      <main>
        <Hero phone={settings.phone} tagline={settings.tagline} />
        <ConfigNotice />
        <Menu />
        <Combos />
        <Hours />
        <Location settings={settings} />
      </main>
      <Footer phone={settings.phone} address={settings.address} />
    </>
  );
}

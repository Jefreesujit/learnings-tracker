import { Mixpanel } from 'mixpanel-react-native';
import { getDeviceStats } from './index';

const trackAutomaticEvents = true;
const mixpanel = new Mixpanel('63a77e451a7a97b9031d32ec0e56a1a2', trackAutomaticEvents);
mixpanel.init();

export const trackEvent = (eventName, data) => {
  mixpanel.track(eventName, data);
};

export const increment = (property) => {
  mixpanel.getPeople().increment(property);
}

export const trackUserDetails = async (userData: *) => {
  const { uid, email, name } = userData;
  const deviceStats = getDeviceStats();

  mixpanel.getPeople().set("uid", uid);
  mixpanel.getPeople().set("$email", email);
  mixpanel.getPeople().set("$username", name);

  Object.keys(deviceStats).forEach(key => {
    mixpanel.getPeople().set(key, deviceStats[key]);
  });
};

export const trackLogin = (uid, loginType) => {
  mixpanel.identify(uid);
  mixpanel.track('Login', {
    loginType,
  });
};

export const trackSignUp = async (uid) => {
  const distinctId = await mixpanel.getDistinctId();
  mixpanel.alias(uid, distinctId);
  mixpanel.track('SignUp');
};

export const trackLogout = () => {
  mixpanel.track('Logout');
  mixpanel.reset();
};


export function addEvent(action, label, eventName, value) {
  var vendor = window.location.host.replace(/\..+/, '') || 'Default';
  window.ga('send', {
    'hitType': eventName || 'event',          
    'eventCategory': vendor || 'default',   
    'eventAction': action || 'report',      
    'eventLabel': label,
    'eventValue': value || 1
  });
}
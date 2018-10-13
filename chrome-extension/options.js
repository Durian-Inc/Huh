// Saves options to chrome.storage
function saveOptions() {
  var zipCode = document.getElementById('zip').value;
  chrome.storage.sync.set({
    zip: zipCode
  }, () => {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 1000);
  });
}


function restoreOptions() {
  // default to no zip code provided
  chrome.storage.sync.get({
    zip: ''
  }, (items) => {
    document.getElementById('zip').value = items.zip;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
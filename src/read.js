var fileTypes = ['xml'];
document.getElementById('fileInput').addEventListener('change', function selectedFileChanged() {
  if (this.files.length === 0) {
    console.log('No file selected.');
    return;
  }

  var extension = this.files[0].name.split('.').pop().toLowerCase(),
    isSuccess = fileTypes.indexOf(extension) > -1;

  if (isSuccess) {
    const reader = new FileReader();
    reader.onload = function readFileCompleted() {
      let finalString = '';
      const tags = ['m_id', 'm_type', 'm_time', 'm_position', 'm_width', 'm_subId'];
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(reader.result, 'text/xml');
      for (item of tags) {
        for (tag of xmlDoc.getElementsByTagName(item)) {
          for (node of tag.childNodes) {
            finalString += `${item}: ${node.nodeValue}<br>`;
          }
        }
      }

      document.getElementById('noteshit').innerHTML = finalString;
      // document.getElementById('noteshit').innerHTML = reader.result;
      console.log(reader.result);
    };
    reader.readAsText(this.files[0]);
  } else {
    document.getElementById('noteshit').innerHTML = 'Wrong file type.';
    console.log('Wrong file type.');
  }
});

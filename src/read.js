// Allowed file types.
var fileTypes = ['xml'];

// Whenever a change occurs on our input...
document.getElementById('fileInput').addEventListener('change', function selectedFileChanged() {
  // Check if there's any files selected at all.
  if (this.files.length === 0) {
    console.log('No file selected.');
    return;
  }

  var extension = this.files[0].name.split('.').pop().toLowerCase(),
    isSuccess = fileTypes.indexOf(extension) > -1;

  if (isSuccess) {
    // Construct a new FileReader instance for reading the input file.
    const reader = new FileReader();

    // Whenever the FileReader loads a file...
    reader.onload = function readFileCompleted() {
      let finalString = '';
      // Tags to display.
      const tags = ['m_id', 'm_type', 'm_time', 'm_position', 'm_width', 'm_subId'];
      // Construct a new DOMParser for parsing our input XML.
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(reader.result, 'text/xml');

      // For every tag in our tag array...
      for (item of tags) {
        // Find it in our XML...
        for (tag of xmlDoc.getElementsByTagName(item)) {
          // And display each value by appending it to finalString.
          for (node of tag.childNodes) {
            finalString += `${item}: ${node.nodeValue}<br>`;
          }
        }
      }

      // Finally, add our finalString to the HTML of an element.
      document.getElementById('noteshit').innerHTML = finalString;
      console.log(reader.result);
    };
    reader.readAsText(this.files[0]);
  } else {
    // Make sure the file type is XML.
    document.getElementById('noteshit').innerHTML = 'Wrong file type.';
    console.log('Wrong file type.');
  }
});

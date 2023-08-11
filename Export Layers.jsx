function unlockAllLayers(parent) {
  var layer;
  for (var i = 0, len = parent.length; i < len; i++) {
    layer = parent[i];
    layer.locked = false;
    layer.visible = true;
    unlockAllLayers(layer.layers);
  }
}

var LayerExporter = function() {
  app.pasteRemembersLayers = true;
  app.activeDocument.selection = null;
  unlockAllLayers(app.activeDocument.layers);
  this.exportLayers(app.activeDocument);
};

LayerExporter.prototype.exportLayers = function(root) {
  var layers = root.layers;
  var layer, file, doc;

  // Reverse the loop to iterate through the layers in reverse order
  for (var i = layers.length - 1; i >= 0; i--) {
    layer = layers[i];
    layer.hasSelectedArtwork = true;
    app.copy();
    file = new File("~/Desktop/" + (layers.length - 1 - i) + ".ai"); // Update the file name
    doc = app.documents.add(DocumentColorSpace.RGB, 1920, 1080);

    app.executeMenuCommand("pasteInPlace");
    app.pasteRememberLayers = true;

    app.activeDocument.saveAs(file);
    doc.close(SaveOptions.DONOTSAVECHANGES);

    app.activeDocument.selection = null;
  }
};

var originalInteractionLevel = userInteractionLevel;
userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

var layerExporter = new LayerExporter();

userInteractionLevel = originalInteractionLevel;

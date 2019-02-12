# This script will unlock and make visible all layers and, recursively, their sub-layers.
# It will then copy each top-level layer into a new illustrator file and save it on the desktop.
# Todo: Make a file dialog instead of saving to desktop.

`#target "Illustrator"`

class LayerExporter

  constructor: () ->
    app.pasteRemembersLayers = true
    app.activeDocument.selection = null

    # Recursively unlock and make visible all layers
    unlockAllLayers(app.activeDocument.layers)

    @outputFolder = Folder.selectDialog ('Choose output folder.');
    @exportLayers app.activeDocument
    alert("All layers have been exported to #{@outputFolder}/!")

  exportLayers: (root) ->
    for layer in root.layers
      layer.hasSelectedArtwork = true
      app.copy()
      file = new File(@outputFolder + "/" + layer.name + ".ai" );
      doc = app.documents.add(DocumentColorSpace.RGB, 1920, 1080);
      app.executeMenuCommand("pasteInPlace");
      app.pasteRememberLayers = true
      doc.saveAs(file)
      doc.close(SaveOptions.DONOTSAVECHANGES);
      app.activeDocument.selection = null

unlockAllLayers = (parent) ->
  for layer in parent
    layer.locked = false
    layer.visible = true
    unlockAllLayers(layer.layers);


layerExporter = new LayerExporter()
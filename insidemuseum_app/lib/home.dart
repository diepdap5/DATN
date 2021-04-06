import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:insidemuseum_app/camera_sceen.dart';
import 'package:tflite/tflite.dart';

class HomePage extends StatefulWidget {
  final List<CameraDescription> cameras;

  HomePage(this.cameras);

  @override
  _HomePageState createState() => new _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String _model = "";

  @override
  void initState() {
    super.initState();
  }

  loadModel() async {
    await Tflite.loadModel(
        model: "assets/model_dantochoc.tflite",
        labels: "assets/model_dantochoc.txt");
  }

  onSelect(model) {
    setState(() {
      _model = model;
    });
    loadModel();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: _model == ""
            ? Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    RaisedButton(
                      child: const Text("Start"),
                      onPressed: () => onSelect("SSD MobileNet"),
                    ),
                  ],
                ),
              )
            : CameraScreen(
                model: _model,
                cameras: widget.cameras,
              ));
  }
}

import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:tflite/tflite.dart';

import 'camera.dart';
import 'recognition.dart';

class HomePage extends StatefulWidget {
  final List<CameraDescription> cameras;

  HomePage(this.cameras);

  @override
  _HomePageState createState() => new _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<dynamic> _recognitions;
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

  setRecognitions(recognitions, imageHeight, imageWidth) {
    setState(() {
      _recognitions = recognitions;
    });
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
          : Column(
              children: <Widget>[
                Expanded(
                  flex: 8, // 80%
                  child: Camera(
                    widget.cameras,
                    _model,
                    setRecognitions,
                  ),
                ),
                Expanded(
                  flex: 1, // 20%
                  child: Container(
                    width: MediaQuery.of(context).size.width,
                    color: Colors.pink[200],
                    child: Column(
                      children: [
                        Text(
                          'Recognition',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Colors.black.withOpacity(0.8),
                              fontSize: 20),
                        ),
                        Recognition(
                          _recognitions == null ? [] : _recognitions,
                        )
                      ],
                    ),
                  ),
                ),

                // )
              ],
            ),
    );
  }
}

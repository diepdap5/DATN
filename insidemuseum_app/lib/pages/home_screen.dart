import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:insidemuseum_app/pages/camera_sceen.dart';
import 'package:insidemuseum_app/pages/design_course_app_theme.dart';
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
                    // RaisedButton(
                    //   child: const Text("Start"),
                    //   onPressed: () => onSelect("SSD MobileNet"),
                    // ),
                    InkWell(
                      // splashColor: Colors.white24,
                      borderRadius:
                          const BorderRadius.all(Radius.circular(24.0)),
                      onTap: () {
                        onSelect("SSD MobileNet");
                      },
                      child: Padding(
                        padding: const EdgeInsets.only(
                            top: 12, bottom: 12, left: 18, right: 18),
                        child: Center(
                          child: Text(
                            'Start',
                            textAlign: TextAlign.left,
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: 12,
                              letterSpacing: 0.27,
                              color: DesignCourseAppTheme.nearlyBlue,
                            ),
                          ),
                        ),
                      ),
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

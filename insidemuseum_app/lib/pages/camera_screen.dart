import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:insidemuseum_app/main.dart';
import 'package:insidemuseum_app/pages/confirm_screen.dart';
import 'package:insidemuseum_app/pages/design_course_app_theme.dart';
import 'package:insidemuseum_app/pages/result_screen.dart';

import 'recognition/camera.dart';
import 'recognition/recognition.dart';

class CameraScreen extends StatefulWidget {
  final String model;
  final List<CameraDescription> cameras;

  CameraScreen({this.model, this.cameras});

  @override
  _CameraScreenState createState() => new _CameraScreenState();
}

class _CameraScreenState extends State<CameraScreen> {
  List<dynamic> _recognitions;
  bool _continueClassification = true;
  setRecognitions(recognitions, imageHeight, imageWidth) {
    setState(() {
      _recognitions = recognitions;
    });
  }

  int size = 360;
  @override
  Widget build(BuildContext context) {
    final String used_model = ModalRoute.of(context).settings.arguments;
    if (_recognitions != null) {
      for (var re in _recognitions) {
        if (re["confidence"] >= 0.5) {
          setState(() {
            _continueClassification = false;
          });
          break;
        }
      }
    }

    if (_continueClassification == true) {
      return Stack(
        children: <Widget>[
          Camera(
            widget.cameras,
            used_model != null ? used_model : widget.model,
            setRecognitions,
          ),
          Positioned(
            top: (MediaQuery.of(context).size.width / 0.55),
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              decoration: BoxDecoration(
                color: DesignCourseAppTheme.nearlyWhite,
                borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(32.0),
                    topRight: Radius.circular(32.0)),
                boxShadow: <BoxShadow>[
                  BoxShadow(
                      color: DesignCourseAppTheme.grey.withOpacity(0.2),
                      offset: const Offset(1.1, 1.1),
                      blurRadius: 10.0),
                ],
              ),
              child: Padding(
                padding: const EdgeInsets.only(left: 8, right: 8),
                child: SingleChildScrollView(
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Padding(
                          padding: const EdgeInsets.only(
                              left: 16, right: 16, bottom: 8, top: 16),
                          child: Text(
                            'Nhận diện',
                            textAlign: TextAlign.left,
                            style: TextStyle(
                              fontSize: 22,
                              letterSpacing: 0.27,
                              color: DesignCourseAppTheme.nearlyBlue,
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(
                              left: 16, right: 16, bottom: 8, top: 16),
                          child: Recognition(
                            _recognitions == null ? [] : _recognitions,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),

          // )
        ],
      );
    } else {
      return ConfirmScreen(widget.model, widget.cameras);
    }
  }
}

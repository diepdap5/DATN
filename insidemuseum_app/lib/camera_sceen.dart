import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:insidemuseum_app/result.dart';

import 'camera.dart';
import 'recognition.dart';

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

  @override
  Widget build(BuildContext context) {
    final String used_model = ModalRoute.of(context).settings.arguments;
    if (_recognitions != null)
      for (var re in _recognitions)
        if (re["confidence"] >= 0.3) {
          setState(() {
            _continueClassification = false;
          });
          break;
        }

    return _continueClassification == true
        ? Column(
            children: <Widget>[
              Expanded(
                flex: 8, // 80%
                child: Camera(
                  widget.cameras,
                  used_model != null ? used_model : widget.model,
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
                      ),
                    ],
                  ),
                ),
              ),

              // )
            ],
          )
        : ResultPage(
            model: widget.model,
          );
  }
}

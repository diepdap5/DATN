import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:insidemuseum_app/pages/confirm_screen.dart';
import 'package:insidemuseum_app/pages/museum_screen.dart';
import 'package:insidemuseum_app/pages/_component/recognition/choosing.dart';
import 'package:insidemuseum_app/util/design_course_app_theme.dart';
import 'package:insidemuseum_app/generated/l10n.dart';
import 'package:insidemuseum_app/pages/_component/recognition/camera.dart';
import 'package:insidemuseum_app/pages/_component/recognition/recognition.dart';

class CameraScreen extends StatefulWidget {
  final String model;
  final List<CameraDescription> cameras;
  final DateTime startScreenTime;
  CameraScreen({this.model, this.cameras, this.startScreenTime});

  @override
  _CameraScreenState createState() => new _CameraScreenState();
}

class _CameraScreenState extends State<CameraScreen> {
  List<dynamic> _recognitions;
  // String _recogResult = '';
  List<dynamic> _recogResultList = [];
  setRecognitions(recognitions, imageHeight, imageWidth) {
    setState(() {
      _recognitions = recognitions;
    });
  }

  String done;
  int size = 360;
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final String usedModel = ModalRoute.of(context).settings.arguments;
    if (_recognitions != null) {
      for (var re in _recognitions) {
        if (re["confidence"] >= 0.3) {
          setState(() {
            // _recogResult = re["label"];
            _recogResultList.add(re);
          });
          break;
        }
      }
    }
    if (widget.startScreenTime
            .isBefore(DateTime.now().subtract(const Duration(seconds: 10))) ==
        false) {
      return Scaffold(
        body: Stack(
          children: <Widget>[
            Camera(
              widget.cameras,
              usedModel != null ? usedModel : widget.model,
              setRecognitions,
            ),
            Positioned(
              top: 0.0,
              left: 0.0,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: new IconButton(
                    icon: Icon(
                      Icons.arrow_back_ios_outlined,
                      color: DesignCourseAppTheme.nearlyBlue,
                    ),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => MuseumScreen(
                                  museum: widget.model,
                                  cameras: widget.cameras,
                                )),
                      );
                    }),
              ),
            ),
            Positioned(
              top: (MediaQuery.of(context).size.width / 3.0),
              bottom: 0,
              left: 0,
              right: 0,
              child: Container(
                alignment: Alignment.topCenter,
                child: Text(
                  S.of(context).stayScreenAlert +
                      (10 -
                              DateTime.now()
                                  .difference(widget.startScreenTime)
                                  .inSeconds)
                          .toString() +
                      S.of(context).stayScreenAlert2,
                  style: TextStyle(
                      color: DesignCourseAppTheme.nearlyBlue, fontSize: 20),
                ),
              ),
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
                              S.of(context).recognitionTitle,
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
          ],
        ),
      );
    } else {
      return ConfirmScreen(
          widget.model, widget.cameras, choosingResult(_recogResultList));
    }
  }
}

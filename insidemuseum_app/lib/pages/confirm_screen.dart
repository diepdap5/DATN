import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:insidemuseum_app/pages/camera_screen.dart';
import 'package:insidemuseum_app/pages/result_screen.dart';
import 'package:insidemuseum_app/util/design_course_app_theme.dart';
import 'package:insidemuseum_app/generated/l10n.dart';

class ConfirmScreen extends StatelessWidget {
  final String museum;
  final List<CameraDescription> cameras;
  final String _recogResult;

  ConfirmScreen(this.museum, this.cameras, this._recogResult);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue[100],
      body: AlertDialog(
        backgroundColor: Colors.white,
        title: Text(''),
        content: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              Text(S.of(context).confirmArtifact),
              Text(_recogResult,
                  style: TextStyle(
                    fontSize: 22,
                    letterSpacing: 0.27,
                    color: DesignCourseAppTheme.nearlyBlack,
                  )),
            ],
          ),
        ),
        actions: <Widget>[
          TextButton(
            child: Text(S.of(context).confirmTrue,
                style: TextStyle(
                  letterSpacing: 0.27,
                  color: DesignCourseAppTheme.nearlyBlue,
                )),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ResultScreen(
                    museum: 'kyohaku',
                    artifactId: 'B甲104',
                  ),
                ),
              );
            },
          ),
          TextButton(
            child: Text(S.of(context).confirmFalse,
                style: TextStyle(
                  letterSpacing: 0.27,
                  color: DesignCourseAppTheme.nearlyBlue,
                )),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => CameraScreen(
                    model: museum,
                    cameras: cameras,
                    startScreenTime: DateTime.now(),
                  ),
                ),
              );
            },
          ),
        ],
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(10.0))),
      ),
    );
  }
}

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:insidemuseum_app/models/result_api_id.dart';
import 'package:insidemuseum_app/pages/camera_screen.dart';
import 'package:insidemuseum_app/pages/result_screen.dart';
import 'package:insidemuseum_app/util/design_course_app_theme.dart';
import 'package:insidemuseum_app/generated/l10n.dart';
import 'package:insidemuseum_app/util/web_service.dart';

class ConfirmScreen extends StatefulWidget {
  final String museum;
  final List<CameraDescription> cameras;
  final String _recogResult;

  ConfirmScreen(this.museum, this.cameras, this._recogResult);

  @override
  _ConfirmScreenState createState() => _ConfirmScreenState();
}

class _ConfirmScreenState extends State<ConfirmScreen> {
  ArtifactID artifactID;
  List<String> museumList = ["tnm", "kyohaku", "narahaku", "kyuhaku"];

  @override
  void initState() {
    _loadArtifactID(
        museumList[int.parse(widget.museum) - 1], widget._recogResult);
    super.initState();
  }

  _loadArtifactID(String museum, String title) async {
    artifactID = await fetchArtifactID(museum, title);
  }

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
              Text(widget._recogResult,
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
                    museum: widget.museum,
                    artifactId: artifactID.itemKey,
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
                    model: widget.museum,
                    cameras: widget.cameras,
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

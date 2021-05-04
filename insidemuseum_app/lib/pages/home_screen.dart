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
  String _museum;
  List<dynamic> museumList = [
    {"id": "1", "name": "Bảo tàng quốc gia Tokyo"},
    {"id": "2", "name": "Bảo tàng quốc gia Kyoto"},
    {"id": "3", "name": "Bảo tàng quốc gia Nara"},
    {"id": "4", "name": "Bảo tàng quốc gia Kyushu"}
  ];
  @override
  void initState() {
    super.initState();
  }

  loadModel() async {
    await Tflite.loadModel(
        model: "assets/model_dantochoc.tflite",
        labels: "assets/model_dantochoc.txt");
  }

  onSelect(museum) {
    setState(() {
      _museum = museum;
    });
    loadModel();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: _museum == null
            ? Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Container(
                      padding: EdgeInsets.only(
                          right: 20, left: 60, top: 20, bottom: 20),
                      child: Text(
                        'Viện bảo tàng bạn muốn xem là: ',
                        textAlign: TextAlign.left,
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          fontSize: 25,
                          letterSpacing: 0.27,
                          color: DesignCourseAppTheme.nearlyBlue,
                        ),
                      ),
                    ),
                    for (var museum in museumList)
                      InkWell(
                        borderRadius:
                            const BorderRadius.all(Radius.circular(24.0)),
                        onTap: () {
                          onSelect(museum["id"]);
                        },
                        child: Padding(
                          padding: const EdgeInsets.only(
                              top: 5, bottom: 5, left: 18, right: 18),
                          child: Center(
                            child: Container(
                              height: 50,
                              width: 300,
                              decoration: BoxDecoration(
                                  color: DesignCourseAppTheme.nearlyWhite,
                                  borderRadius: const BorderRadius.all(
                                      Radius.circular(24.0)),
                                  border: Border.all(
                                      color: DesignCourseAppTheme.nearlyBlue)),
                              child: Center(
                                child: Text(
                                  museum["name"],
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
                        ),
                      ),
                  ],
                ),
              )
            : CameraScreen(
                model: _museum,
                cameras: widget.cameras,
              ));
  }
}

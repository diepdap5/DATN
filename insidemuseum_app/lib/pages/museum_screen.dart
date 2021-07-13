import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:insidemuseum_app/generated/l10n.dart';
import 'package:insidemuseum_app/models/artifact_demo.dart';
import 'package:insidemuseum_app/pages/camera_screen.dart';
import 'package:insidemuseum_app/pages/home_screen.dart';
import 'package:insidemuseum_app/pages/_component/museum/artifact_list.dart';
import 'package:insidemuseum_app/util/design_course_app_theme.dart';
import 'package:insidemuseum_app/pages/result_screen.dart';
import 'package:insidemuseum_app/util/web_service.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:async';
import 'package:tflite/tflite.dart';

class MuseumScreen extends StatefulWidget {
  final String museum;
  final List<CameraDescription> cameras;
  const MuseumScreen({Key key, this.museum, this.cameras}) : super(key: key);
  @override
  _MuseumScreenState createState() => _MuseumScreenState();
}

class _MuseumScreenState extends State<MuseumScreen> {
  StreamController<List<ArtifactDemo>> _streamArtifactDemoController;
  List<ArtifactDemo> artifactList;
  List<String> museumList = ["tnm", "kyohaku", "narahaku", "kyuhaku"];
  bool isLoading = false;
  int pageCount = 1;
  void setMoreData(bool _reachEnd) {
    if (_reachEnd == true) {
      setState(() {
        print("comes to bottom $isLoading");
        isLoading = true;
        if (isLoading) {
          print("RUNNING LOAD MORE");
          pageCount = pageCount + 1;
          _loadArtifact(pageCount);
        }
      });
    }
  }

  void callbackArtifact(String artifactID) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => ResultScreen(
          museum: widget.museum,
          artifactId: artifactID,
        ),
      ),
    );
  }

  @override
  void initState() {
    _streamArtifactDemoController = StreamController<List<ArtifactDemo>>();
    super.initState();
    _loadArtifact(1);
  }

  void _loadArtifact(int i) async {
    if (i == 1) {
      artifactList = await fetchArtifactDemo(
          museumList[int.parse(widget.museum) - 1], '1');
      _streamArtifactDemoController.add(artifactList);
    } else {
      List<ArtifactDemo> artifactListNext = await fetchArtifactDemo(
          museumList[int.parse(widget.museum) - 1], i.toString());
      artifactList = artifactList + artifactListNext;
      _streamArtifactDemoController.add(artifactList);
    }
  }

  void _showSearchResult(String searchKeyword) async {
    List<ArtifactDemo> result = await fetchSearch(
        museumList[int.parse(widget.museum) - 1], searchKeyword);
    _streamArtifactDemoController.add(result);
  }

  loadModel(museum) async {
    if (museum == "1") {
      await Tflite.loadModel(
          model: "assets/model_tnm.tflite", labels: "assets/class_tnm.txt");
    } else if (museum == "2") {
      await Tflite.loadModel(
          model: "assets/model_kyohaku.tflite",
          labels: "assets/class_kyohaku.txt");
    } else if (museum == "3") {
      await Tflite.loadModel(
          model: "assets/model_narahaku.tflite",
          labels: "assets/class_narahaku.txt");
    } else {
      await Tflite.loadModel(
          model: "assets/model_kyuhaku.tflite",
          labels: "assets/class_kyuhaku.txt");
    }
    // var dir = await getApplicationDocumentsDirectory();
    // await Tflite.loadModel(
    //     model: "${dir.path}/model_kyohaku.tflite",
    //     labels: "${dir.path}/label_kyohaku.txt",
    //     isAsset: false);
  }

  onSelect(museum) {
    loadModel(museum);
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) => CameraScreen(
                model: museum,
                cameras: widget.cameras,
                startScreenTime: DateTime.now())));
  }

  @override
  Widget build(BuildContext context) {
    List<dynamic> museums = [
      {"id": "1", "name": S.of(context).museumName1},
      {"id": "2", "name": S.of(context).museumName2},
      {"id": "3", "name": S.of(context).museumName3},
      {"id": "4", "name": S.of(context).museumName4}
    ];
    Widget getTopBarUI() {
      return Padding(
        padding: const EdgeInsets.only(top: 5.0, bottom: 5.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            // Back to Home
            IconButton(
              icon: Icon(Icons.arrow_back_ios_rounded),
              onPressed: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => HomePage(widget.cameras, null),
                    ));
              },
              color: DesignCourseAppTheme.nearlyBlue,
              iconSize: 40,
            ),
            // Search Bar
            Container(
              width: MediaQuery.of(context).size.width * 0.7,
              height: 64,
              child: Padding(
                padding: const EdgeInsets.only(top: 8, bottom: 8),
                child: Container(
                  decoration: BoxDecoration(
                      color: DesignCourseAppTheme.nearlyWhite,
                      borderRadius: const BorderRadius.only(
                        bottomRight: Radius.circular(13.0),
                        bottomLeft: Radius.circular(13.0),
                        topLeft: Radius.circular(13.0),
                        topRight: Radius.circular(13.0),
                      ),
                      border:
                          Border.all(color: DesignCourseAppTheme.nearlyBlue)),
                  child: Row(
                    children: <Widget>[
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.only(left: 16, right: 16),
                          child: TextFormField(
                            style: TextStyle(
                              fontFamily: 'WorkSans',
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                              color: DesignCourseAppTheme.nearlyBlue,
                            ),
                            keyboardType: TextInputType.text,
                            decoration: InputDecoration(
                              hintText: S.of(context).searchPlaceholder,
                              border: InputBorder.none,
                              hintStyle: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                                color: DesignCourseAppTheme.nearlyBlue,
                              ),
                            ),
                            onChanged: (value) {
                              if (value != "") {
                                setState(() {
                                  _showSearchResult(value);
                                });
                              } else {
                                setState(() {
                                  _loadArtifact(1);
                                });
                              }
                            },
                          ),
                        ),
                      ),
                      SizedBox(
                        width: 60,
                        height: 60,
                        child: Icon(Icons.search,
                            color: DesignCourseAppTheme.nearlyBlue),
                      )
                    ],
                  ),
                ),
              ),
            ),
            // Camera for Recognition
            IconButton(
              icon: Icon(Icons.camera_alt),
              onPressed: () {
                onSelect(widget.museum);
              },
              color: DesignCourseAppTheme.nearlyBlue,
              iconSize: 40,
            )
          ],
        ),
      );
    }

    Widget getMuseumArtifactUI(List<ArtifactDemo> data) {
      return Padding(
        padding: const EdgeInsets.only(top: 8.0, left: 18, right: 16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Flexible(
              child: ArtifactListView(
                  setMoreData: setMoreData,
                  artifactDemo: data,
                  callbackArtifact: callbackArtifact),
            )
          ],
        ),
      );
    }

    return Scaffold(
        body: StreamBuilder<List<ArtifactDemo>>(
            stream: _streamArtifactDemoController.stream,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                List<ArtifactDemo> data = snapshot.data;
                return Column(
                  children: <Widget>[
                    SizedBox(
                      height: MediaQuery.of(context).padding.top,
                    ),
                    Expanded(
                      child: SingleChildScrollView(
                        child: Container(
                          height: MediaQuery.of(context).size.height,
                          child: Column(
                            children: <Widget>[
                              // Museum name
                              Container(
                                padding: EdgeInsets.all(8.0),
                                alignment: Alignment.center,
                                child: Text(
                                  museums[int.parse(widget.museum) - 1]["name"],
                                  textAlign: TextAlign.left,
                                  style: TextStyle(
                                    fontWeight: FontWeight.w600,
                                    fontSize: 25,
                                    letterSpacing: 0.27,
                                    color: DesignCourseAppTheme.nearlyBlue,
                                  ),
                                ),
                              ),
                              getTopBarUI(),
                              Flexible(
                                child: getMuseumArtifactUI(data),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                );
              } else {
                return Center(child: CircularProgressIndicator());
              }
            }));
  }
}

import 'dart:async';
import 'package:flutter/material.dart';
import 'package:insidemuseum_app/models/artifact.dart';
import 'package:insidemuseum_app/pages/_component/result/result_cover_image.dart';
import 'package:insidemuseum_app/pages/_component/result/result_information.dart';
import 'package:insidemuseum_app/util/web_service.dart';
import '../util/design_course_app_theme.dart';

class ResultScreen extends StatefulWidget {
  final String museum;
  final String artifactId;

  const ResultScreen({Key key, this.museum, this.artifactId}) : super(key: key);
  @override
  _ResultScreenState createState() => _ResultScreenState();
}

class _ResultScreenState extends State<ResultScreen> {
  Future<Artifact> futureArtifact;
  List<String> museumList = ["tnm", "kyohaku", "narahaku", "kyuhaku"];
  @override
  void initState() {
    futureArtifact = fetchArtifact(
        museumList[int.parse(widget.museum) - 1], widget.artifactId);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: DesignCourseAppTheme.nearlyWhite,
      child: Scaffold(
          backgroundColor: Colors.transparent,
          body: Center(
              child: FutureBuilder<Artifact>(
                  future: futureArtifact,
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      return Stack(
                        children: <Widget>[
                          // Cover Image
                          CoverImage(
                              base64Image: snapshot.data.imageBase64List[0]),
                          // Information
                          Positioned(
                            top: (MediaQuery.of(context).size.width / 1.2) -
                                24.0,
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
                                      color: DesignCourseAppTheme.grey
                                          .withOpacity(0.2),
                                      offset: const Offset(1.1, 1.1),
                                      blurRadius: 10.0),
                                ],
                              ),
                              child: Padding(
                                  padding:
                                      const EdgeInsets.only(left: 8, right: 8),
                                  child: ResultInformation(
                                    museum: widget.museum,
                                    artifact: snapshot.data,
                                  )),
                            ),
                          ),
                          // Back Button
                          Padding(
                            padding: EdgeInsets.only(
                                top: MediaQuery.of(context).padding.top),
                            child: SizedBox(
                              width: AppBar().preferredSize.height,
                              height: AppBar().preferredSize.height,
                              child: Material(
                                color: Colors.transparent,
                                child: InkWell(
                                  borderRadius: BorderRadius.circular(
                                      AppBar().preferredSize.height),
                                  child: Icon(
                                    Icons.arrow_back_ios,
                                    color: DesignCourseAppTheme.nearlyBlack,
                                  ),
                                  onTap: () {
                                    Navigator.pop(context);
                                  },
                                ),
                              ),
                            ),
                          )
                        ],
                      );
                    }
                    return CircularProgressIndicator();
                  }))),
    );
  }
}

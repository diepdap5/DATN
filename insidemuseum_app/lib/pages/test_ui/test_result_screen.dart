import 'dart:async';

import 'package:flutter/material.dart';
import 'package:insidemuseum_app/models/artifact.dart';
import '../design_course_app_theme.dart';

class CourseInfoScreen extends StatefulWidget {
  @override
  _CourseInfoScreenState createState() => _CourseInfoScreenState();
}

class _CourseInfoScreenState extends State<CourseInfoScreen>
    with TickerProviderStateMixin {
  final double infoHeight = 364.0;
  AnimationController animationController;
  Animation<double> animation;
  double opacity1 = 0.0;
  double opacity2 = 0.0;
  double opacity3 = 0.0;
  Future<Artifact> futureArtifact;
  @override
  void initState() {
    animationController = AnimationController(
        duration: const Duration(milliseconds: 1000), vsync: this);
    animation = Tween<double>(begin: 0.0, end: 1.0).animate(CurvedAnimation(
        parent: animationController,
        curve: Interval(0, 1.0, curve: Curves.fastOutSlowIn)));
    setData();
    futureArtifact = fetchArtifact('kyuhaku', 'A12');
    super.initState();
  }

  Future<void> setData() async {
    animationController.forward();
    await Future<dynamic>.delayed(const Duration(milliseconds: 200));
    setState(() {
      opacity1 = 1.0;
    });
    await Future<dynamic>.delayed(const Duration(milliseconds: 200));
    setState(() {
      opacity2 = 1.0;
    });
    await Future<dynamic>.delayed(const Duration(milliseconds: 200));
    setState(() {
      opacity3 = 1.0;
    });
  }

  @override
  Widget build(BuildContext context) {
    final double tempHeight = MediaQuery.of(context).size.height -
        (MediaQuery.of(context).size.width / 1.2) +
        24.0;
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
                          Column(
                            children: <Widget>[
                              AspectRatio(
                                aspectRatio: 1.2,
                                child: Container(
                                  decoration: BoxDecoration(
                                    image: DecorationImage(
                                        fit: BoxFit.fill,
                                        image: AssetImage(
                                            'assets/demo_image2.jpg')),
                                  ),
                                ),
                              ),
                            ],
                          ),
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
                                child: SingleChildScrollView(
                                  child: Center(
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      // mainAxisSize: MainAxisSize.min,
                                      children: <Widget>[
                                        Padding(
                                          padding: const EdgeInsets.only(
                                              top: 32.0, left: 18, right: 16),
                                          child: Text(
                                            '${snapshot.data.title}',
                                            textAlign: TextAlign.left,
                                            style: TextStyle(
                                              fontWeight: FontWeight.w600,
                                              fontSize: 22,
                                              letterSpacing: 0.27,
                                              color: DesignCourseAppTheme
                                                  .darkerText,
                                            ),
                                          ),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.only(
                                              left: 16,
                                              right: 16,
                                              bottom: 8,
                                              top: 16),
                                          child: Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            crossAxisAlignment:
                                                CrossAxisAlignment.center,
                                            children: <Widget>[
                                              Text(
                                                '${snapshot.data.jidai}',
                                                textAlign: TextAlign.left,
                                                style: TextStyle(
                                                  // fontWeight: FontWeight.w200,
                                                  fontSize: 22,
                                                  letterSpacing: 0.27,
                                                  color: DesignCourseAppTheme
                                                      .nearlyBlue,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.only(
                                              left: 16,
                                              right: 16,
                                              top: 8,
                                              bottom: 8),
                                          child: Text(
                                            '${snapshot.data.descriptionText}',
                                            textAlign: TextAlign.justify,
                                            style: TextStyle(
                                              // fontWeight: FontWeight.w200,
                                              fontSize: 14,
                                              letterSpacing: 0.27,
                                              color: DesignCourseAppTheme.grey,
                                            ),
                                          ),
                                        ),
                                        SizedBox(
                                          height: 200,
                                          child: ListView(
                                            scrollDirection: Axis.horizontal,
                                            children: [
                                              for (var i = 0; i < 6; i++)
                                                Container(
                                                  child: Padding(
                                                    padding:
                                                        const EdgeInsets.only(
                                                            top: 24,
                                                            bottom: 24,
                                                            left: 16),
                                                    child: Row(
                                                      children: <Widget>[
                                                        ClipRRect(
                                                          borderRadius:
                                                              const BorderRadius
                                                                      .all(
                                                                  Radius
                                                                      .circular(
                                                                          16.0)),
                                                          child: AspectRatio(
                                                            aspectRatio: 1.0,
                                                            child: Container(
                                                              decoration:
                                                                  BoxDecoration(
                                                                image: DecorationImage(
                                                                    fit: BoxFit
                                                                        .fill,
                                                                    image: AssetImage(
                                                                        'assets/demo_image.jpg')),
                                                              ),
                                                            ),
                                                          ),
                                                        )
                                                      ],
                                                    ),
                                                  ),
                                                ),
                                            ],
                                          ),
                                        )
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
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

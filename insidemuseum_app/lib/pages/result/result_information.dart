import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:insidemuseum_app/models/artifact.dart';
import 'package:insidemuseum_app/util/design_course_app_theme.dart';

class ResultInformation extends StatefulWidget {
  final Artifact artifact;

  const ResultInformation({Key key, this.artifact}) : super(key: key);
  @override
  _ResultInformationState createState() => _ResultInformationState();
}

class _ResultInformationState extends State<ResultInformation> {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.only(top: 32.0, left: 18, right: 16),
              child: Text(
                '${widget.artifact.title}',
                textAlign: TextAlign.left,
                style: TextStyle(
                  fontWeight: FontWeight.w600,
                  fontSize: 22,
                  letterSpacing: 0.27,
                  color: DesignCourseAppTheme.darkerText,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(
                  left: 16, right: 16, bottom: 8, top: 16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Text(
                    '${widget.artifact.jidai}',
                    textAlign: TextAlign.left,
                    style: TextStyle(
                      fontSize: 22,
                      letterSpacing: 0.27,
                      color: DesignCourseAppTheme.nearlyBlue,
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding:
                  const EdgeInsets.only(left: 16, right: 16, top: 8, bottom: 8),
              child: Text(
                '${widget.artifact.descriptionText}',
                textAlign: TextAlign.justify,
                style: TextStyle(
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
                  for (var i = 0;
                      i < widget.artifact.imageBase64List.length;
                      i++)
                    Container(
                      child: Padding(
                        padding: const EdgeInsets.only(
                            top: 24, bottom: 24, left: 16),
                        child: Row(
                          children: <Widget>[
                            ClipRRect(
                              borderRadius:
                                  const BorderRadius.all(Radius.circular(16.0)),
                              child: AspectRatio(
                                aspectRatio: 1.0,
                                child: Container(
                                  decoration: BoxDecoration(
                                    image: DecorationImage(
                                        fit: BoxFit.fill,
                                        image: MemoryImage(base64Decode(widget
                                            .artifact.imageBase64List[i]))),
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
    );
  }
}

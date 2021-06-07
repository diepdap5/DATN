import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:insidemuseum_app/util/design_course_app_theme.dart';

class CoverImage extends StatelessWidget {
  final dynamic base64Image;

  const CoverImage({Key key, this.base64Image}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        AspectRatio(
          aspectRatio: 1.2,
          child: Container(
            decoration: BoxDecoration(
              color: DesignCourseAppTheme.nearlyBlue,
              image: DecorationImage(
                  fit: BoxFit.fill,
                  image: MemoryImage(base64Decode(base64Image))),
            ),
          ),
        ),
      ],
    );
  }
}

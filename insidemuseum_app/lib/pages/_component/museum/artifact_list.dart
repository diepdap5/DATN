import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:insidemuseum_app/models/artifact_demo.dart';

typedef void Callback(bool _reachEnd);
typedef void CallbackArtifact(String artifactID);

class ArtifactListView extends StatefulWidget {
  final Callback setMoreData;
  final List<ArtifactDemo> artifactDemo;
  final CallbackArtifact callbackArtifact;
  const ArtifactListView(
      {Key key, this.setMoreData, this.artifactDemo, this.callbackArtifact})
      : super(key: key);

  @override
  _ArtifactListViewState createState() => _ArtifactListViewState();
}

class _ArtifactListViewState extends State<ArtifactListView>
    with TickerProviderStateMixin {
  AnimationController animationController;
  ScrollController _scrollController;
  @override
  void initState() {
    animationController = AnimationController(
        duration: const Duration(milliseconds: 2000), vsync: this);
    _scrollController = new ScrollController(initialScrollOffset: 5.0)
      ..addListener(_scrollListener);
    super.initState();
  }

  _scrollListener() {
    if (_scrollController.offset >=
            _scrollController.position.maxScrollExtent &&
        !_scrollController.position.outOfRange) {
      widget.setMoreData(true);
    }
  }

  @override
  Widget build(BuildContext context) {
    return GridView(
      controller: _scrollController,
      padding: const EdgeInsets.all(0),
      physics: const BouncingScrollPhysics(),
      scrollDirection: Axis.vertical,
      children: List<Widget>.generate(
        widget.artifactDemo.length,
        (int index) {
          final int count = widget.artifactDemo.length;
          final Animation<double> animation =
              Tween<double>(begin: 0.0, end: 1.0).animate(
            CurvedAnimation(
              parent: animationController,
              curve: Interval((1 / count) * index, 1.0,
                  curve: Curves.fastOutSlowIn),
            ),
          );
          animationController.forward();
          return ArtifactView(
            artifact: widget.artifactDemo[index],
            callbackArtifact: widget.callbackArtifact,
            animation: animation,
            animationController: animationController,
          );
        },
      ),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 16.0,
        crossAxisSpacing: 16.0,
        childAspectRatio: 0.8,
      ),
    );
  }
}

class ArtifactView extends StatelessWidget {
  const ArtifactView(
      {Key key,
      this.animationController,
      this.animation,
      this.callbackArtifact,
      this.artifact})
      : super(key: key);

  final CallbackArtifact callbackArtifact;
  final ArtifactDemo artifact;
  final AnimationController animationController;
  final Animation<dynamic> animation;

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: animationController,
      builder: (BuildContext context, Widget child) {
        return FadeTransition(
          opacity: animation,
          child: Transform(
            transform: Matrix4.translationValues(
                0.0, 50 * (1.0 - animation.value), 0.0),
            child: InkWell(
              splashColor: Colors.transparent,
              onTap: () {
                callbackArtifact(artifact.itemKey);
              },
              child: SizedBox(
                height: 200,
                child: ClipRRect(
                  borderRadius: const BorderRadius.all(Radius.circular(16.0)),
                  child: AspectRatio(
                    aspectRatio: 1.0,
                    child: Container(
                      decoration: BoxDecoration(
                        image: DecorationImage(
                            fit: BoxFit.fill,
                            image: MemoryImage(
                                base64Decode(artifact.imageBase64))),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}

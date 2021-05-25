import 'package:floating_action_bubble/floating_action_bubble.dart';
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:insidemuseum_app/generated/l10n.dart';
import 'package:insidemuseum_app/main.dart';
import 'package:insidemuseum_app/pages/museum_screen.dart';
import 'package:insidemuseum_app/util/design_course_app_theme.dart';

class HomePage extends StatefulWidget {
  final List<CameraDescription> cameras;
  final String museum;
  HomePage(this.cameras, this.museum);

  @override
  _HomePageState createState() => new _HomePageState();
}

class _HomePageState extends State<HomePage>
    with SingleTickerProviderStateMixin {
  Animation<double> _animation;
  AnimationController _animationController;
  @override
  void initState() {
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 260),
    );

    final curvedAnimation =
        CurvedAnimation(curve: Curves.easeInOut, parent: _animationController);
    _animation = Tween<double>(begin: 0, end: 1).animate(curvedAnimation);
    super.initState();
  }

  onSelect(museum) {
    Navigator.push(
      context,
      MaterialPageRoute(
          builder: (context) => MuseumScreen(
                museum: museum,
                cameras: widget.cameras,
              )),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
              padding:
                  EdgeInsets.only(right: 20, left: 60, top: 20, bottom: 20),
              child: Text(
                S.of(context).choosingMuseum,
                textAlign: TextAlign.left,
                style: TextStyle(
                  fontWeight: FontWeight.w600,
                  fontSize: 30,
                  letterSpacing: 0.27,
                  color: DesignCourseAppTheme.nearlyBlue,
                ),
              ),
            ),
            for (var museum in [
              {"id": "1", "name": S.of(context).museumName1},
              {"id": "2", "name": S.of(context).museumName2},
              {"id": "3", "name": S.of(context).museumName3},
              {"id": "4", "name": S.of(context).museumName4}
            ])
              InkWell(
                borderRadius: const BorderRadius.all(Radius.circular(24.0)),
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
                          borderRadius:
                              const BorderRadius.all(Radius.circular(24.0)),
                          border: Border.all(
                              color: DesignCourseAppTheme.nearlyBlue)),
                      child: Center(
                        child: Text(
                          museum["name"],
                          textAlign: TextAlign.left,
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                            fontSize: 16,
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
      ),
      floatingActionButton: FloatingActionBubble(
        // Menu items
        items: <Bubble>[
          // Floating action menu item
          Bubble(
            title: "Japanese",
            iconColor: Colors.white,
            bubbleColor: DesignCourseAppTheme.nearlyBlue,
            icon: Icons.language,
            titleStyle: TextStyle(fontSize: 16, color: Colors.white),
            onPress: () {
              setState(() {
                S.load(Locale('ja'));
              });
              _animationController.reverse();
            },
          ),
          //Floating action menu item
          Bubble(
            title: "English",
            iconColor: Colors.white,
            bubbleColor: DesignCourseAppTheme.nearlyBlue,
            icon: Icons.language,
            titleStyle: TextStyle(fontSize: 16, color: Colors.white),
            onPress: () {
              setState(() {
                S.load(Locale('en'));
              });
              _animationController.reverse();
            },
          ),
        ],

        // animation controller
        animation: _animation,

        // On pressed change animation state
        onPress: () => _animationController.isCompleted
            ? _animationController.reverse()
            : _animationController.forward(),

        // Floating Action button Icon color
        iconColor: DesignCourseAppTheme.nearlyBlue,

        // Flaoting Action button Icon
        iconData: Icons.settings,
        backGroundColor: Colors.white,
      ),
    );
  }
}

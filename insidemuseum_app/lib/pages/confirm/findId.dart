import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:insidemuseum_app/util/globals.dart';

Future<String> findId(museum, title) async {
  final response = await http
      .get(Uri.http(serverLink, '/getIdByTitle/' + museum + '/' + title));
  print('Hihihihihi');
  if (response.statusCode == 200) {
    print('Hahahaha');
    print(response.body);
    String result = response.body;
    return result;
  } else {
    throw Exception('Failed to load Artifact');
  }
}

import 'dart:convert';

import 'package:insidemuseum_app/models/artifact.dart';
import 'package:insidemuseum_app/models/artifact_demo.dart';
import 'package:insidemuseum_app/models/result_api_id.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;
import 'globals.dart';

Future<List<ArtifactDemo>> fetchArtifactDemo(String museum, String page) async {
  String locale = Intl.getCurrentLocale();
  final response = await http.get(Uri.http(serverLink,
      '/getAllPagination/' + museum + '/' + locale + '/page/' + page));
  if (response.statusCode == 200) {
    List jsonResponse = json.decode(response.body);
    return jsonResponse.map((data) => new ArtifactDemo.fromJson(data)).toList();
  } else {
    throw Exception('Unexpected error occured!');
  }
}

Future<List<ArtifactDemo>> fetchSearch(
    String museum, String searchKeyword) async {
  String locale = Intl.getCurrentLocale();
  final response = await http.get(Uri.http(
      serverLink, '/search/' + museum + '/' + locale + '/' + searchKeyword));
  if (response.statusCode == 200) {
    List jsonResponse = json.decode(response.body);
    return jsonResponse.map((data) => new ArtifactDemo.fromJson(data)).toList();
  } else {
    throw Exception('Unexpected error occured!');
  }
}

Future<Artifact> fetchArtifact(String museumName, String artifactId) async {
  String locale = Intl.getCurrentLocale();
  final response = await http.get(Uri.http(
      serverLink, '/getById/' + museumName + '/' + locale + '/' + artifactId));
  if (response.statusCode == 200) {
    return Artifact.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to load Artifact');
  }
}

Future<ArtifactID> fetchArtifactID(String museumName, String title) async {
  final response = await http
      .get(Uri.http(serverLink, '/getIdByTitle/' + museumName + '/' + title));
  if (response.statusCode == 200) {
    return ArtifactID.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to load ArtifactID');
  }
}

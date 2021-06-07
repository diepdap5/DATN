import 'package:http/http.dart' as http;
import 'package:insidemuseum_app/util/globals.dart';
import 'dart:async';
import 'dart:convert';

class ArtifactID {
  final String itemKey;
  ArtifactID({this.itemKey});

  factory ArtifactID.fromJson(Map<String, dynamic> json) {
    return ArtifactID(itemKey: json['id']);
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

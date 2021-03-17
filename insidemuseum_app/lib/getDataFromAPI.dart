import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

List<Artifact> parseArtifacts(String responseBody) {
  final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();
  return parsed.map<Artifact>((json) => Artifact.fromJson(json)).toList();
}

Future<List<Artifact>> fetchArtifact() async {
  final response = await http.get(Uri.http('192.168.43.98:3000', '/artifacts'));

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return parseArtifacts(response.body);
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load Artifact');
  }
}

class Artifact {
  final String id;
  final String name;

  Artifact({this.id, this.name});

  factory Artifact.fromJson(Map<String, dynamic> json) {
    return Artifact(
      id: json['id'] as String,
      name: json['name' as String],
    );
  }
}

class GetDataFromAPI extends StatefulWidget {
  GetDataFromAPI({Key key}) : super(key: key);

  @override
  _GetDataFromAPIState createState() => _GetDataFromAPIState();
}

class _GetDataFromAPIState extends State<GetDataFromAPI> {
  Future<List<Artifact>> futureArtifact;

  @override
  void initState() {
    super.initState();
    futureArtifact = fetchArtifact();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Fetch Data Example'),
      ),
      body: Center(
        child: FutureBuilder<List<Artifact>>(
          future: futureArtifact,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return ListView.builder(
                  padding: const EdgeInsets.all(8),
                  itemCount: snapshot.data.length,
                  itemBuilder: (BuildContext context, int index) {
                    return Container(
                      height: 50,
                      child: Center(
                          child: Text(
                              '${snapshot.data[index].id} ${snapshot.data[index].name}')),
                    );
                  });
            } else if (snapshot.hasError) {
              return Text("${snapshot.error}");
            }

            // By default, show a loading spinner.
            return CircularProgressIndicator();
          },
        ),
      ),
    );
  }
}

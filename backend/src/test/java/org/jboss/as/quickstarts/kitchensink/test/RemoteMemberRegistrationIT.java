/*
 * JBoss, Home of Professional Open Source
 * Copyright 2015, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.jboss.as.quickstarts.kitchensink.test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

// import org.jboss.logging.Logger;
import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import jakarta.json.Json;
import jakarta.json.JsonObject;

@QuarkusTest
public class RemoteMemberRegistrationIT {

    // private static final Logger log =
    // Logger.getLogger(RemoteMemberRegistrationIT.class.getName());

    @Test
    public void testRegister() {
        JsonObject json = Json.createObjectBuilder()
                .add("name", "Jane Doe")
                .add("email", "jane@mailinator.com")
                .add("phoneNumber", "2125551234")
                .build();

        given()
                .contentType(ContentType.JSON)
                .body(json.toString())
                .when()
                .post("/members")
                .then()
                .statusCode(200)
                .body(is(""));
    }
}

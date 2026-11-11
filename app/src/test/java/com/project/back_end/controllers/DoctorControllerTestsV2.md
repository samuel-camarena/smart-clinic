package com.project.back_end.controllers;

import com.project.back_end.services.AppointmentService;
import com.project.back_end.services.DoctorService;
import com.project.back_end.services.MainService;
import com.project.back_end.services.TokenService;
import jakarta.servlet.Servlet;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.MissingServletRequestParameterException;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/*
Consejo: En tus tests de Spring Boot, asegúrate de que esa propiedad esté definida en el
application-test.properties o pásala como una propiedad en la anotación:
@WebMvcTest(properties = "api.path=/v1/", controllers = AdminController.class).
Así MockMvc sabrá exactamente a qué URL llamar.
*/
@WebMvcTest(DoctorController.class)
//@DisplayName("Tests de Disponibilidad de Doctores")
public class DoctorControllerTests {
@Autowired
private MockMvc mockMvc;
@MockitoBean
private DoctorServiceV2 doctorService;
@MockitoBean
private TokenService tokenService;
@MockitoBean
private MainService mainService;
@MockitoBean
private AppointmentService appointmentService;

    private DoctorController doctorController;
    
    private final long VALID_DOCTOR_ID = 1L;
    private final LocalDate VALID_DATE = LocalDate.of(2026, 4, 15);
    private final long INVALID_DOCTOR_ID = -1L;
    private final LocalDate INVALID_DATE = LocalDate.of(1980, 1, 1);
    private List<String> MOCK_AVAILABLE_TIMES = List.of("10:00-11:00", "11:00-12:00");
    
    private final String VALID_AUTH_TOKEN = "Bearer valid-token";
    private final String VALID_USER_NAME = "Sam";
    private final String INVALID_AUTH_TOKEN = "Bearer invalid-token";
    private final String INVALID_USER_NAME = "invalid-username";
    
    private MockHttpServletRequestBuilder request;
    private final String BASE_URL = "/v1/doctor";
    
    
    // TODO: 1. ¿Es suficientemente descriptivo el nombre actual `getBaseRequest` o debemos ampliarlo acorde a la extensión funcional?
    //  Ejemplo: getEndpointWithCredentialsRequest(), getEndpointRequest(), getEndpointWithHeadersRequest()
    private MockHttpServletRequestBuilder getBaseRequest(String endpoint, String username, String token) {
        request = get(BASE_URL + endpoint);
        if (username != null)
            request.header("X-User", username);
        
        if (token != null)
            request.header("Authorization", token);
        
        return request;
    }
    
    class HappyContext {
    
    }
    
    /*
        El responsable es `MainService` y su integración con el Controlador.
     */
    @Nested
    class SecurityContext {
        // Configuración para  📈✔️+🏗️✔️
        // @BeforeEach ...
        
        @Nested
        @DisplayName("Given valid credentials") // Agrupación para 🛡️✔️️
        class ValidCredentialsContext {
            // Configuración para 🛡️✔️️
            @BeforeEach
            void setupRequestWithHeaders() throws Exception {
                request = getBaseRequest("/availability", VALID_USER_NAME, VALID_AUTH_TOKEN);
            }
            
            // TODO: 2. Optimizar nombre del Método: setupCommonStubs(), setupSharedStubs(), setupGeneralStubs(), setupGenericStubs(), setupBasicStubs()
            @BeforeEach
            void setupStubs() throws Exception {
                when(mainService.validateToken(VALID_AUTH_TOKEN, VALID_USER_NAME))
                    .thenReturn(ResponseEntity.ok().build());
            }
            
            @Nested
            @DisplayName("and Given valid parameters")
            class ValidParamsContext {
                
                @BeforeEach
                void addValidParamsToRequest() {
                    request.param("doctorId", String.valueOf(VALID_DOCTOR_ID))
                        .param("date", VALID_DATE.toString());
                }
                
                @Test
                @DisplayName("Should return HTTP 200 OK and available times List")
                void whenGetDoctorAvailability_thenOkAndBodyWithAvailableTimes() throws Exception {
                    when(doctorService.getDoctorAvailability(VALID_DOCTOR_ID, VALID_DATE))
                        .thenReturn(ResponseEntity.ok(Map.of("availableTimes", MOCK_AVAILABLE_TIMES)));
                    
                    mockMvc.perform(request)
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.availableTimes").isArray())
                        .andExpect(jsonPath("$.availableTimes[0]").value(MOCK_AVAILABLE_TIMES.getFirst()));
                }
                
                // Method: getDoctor
                
                // Method: saveDoctor
                
                // Method: doctorLogin
                
                // Method: updateDoctor
                
                // Method: deleteDoctor
                
                // Method: filterDoctors
            }
            
            @Nested
            @DisplayName("and Given invalid parameters")
            class InvalidParamsContext {
                
                @BeforeEach
                void addInvalidParams() {
                    request.param("doctorId", String.valueOf(INVALID_DOCTOR_ID))
                        .param("date", INVALID_DATE.toString());
                }
                
                @Test
                    // TODO: @DisplayName("")
                void whenGetDoctorAvailability_thenOkAndBodyWithAvailableTimesEmpty() throws Exception {
                    when(doctorService.getDoctorAvailability(INVALID_DOCTOR_ID, INVALID_DATE))
                        .thenReturn(ResponseEntity.ok(Map.of("availableTimes", List.of())));
                    
                    mockMvc.perform(request)
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.availableTimes").isEmpty());
                }
                
                // Method: getDoctor
                
                // Method: saveDoctor
                
                // Method: doctorLogin
                
                // Method: updateDoctor
                
                // Method: deleteDoctor
                
                // Method: filterDoctors
            }
            
            @Nested
            @DisplayName("and Given missing parameters")
            class IllegalParamsContext {
                
                @Test
                    // TODO: 3. Pensar en como utilizar displayName, mientras utilizar el nombre del método.
                void givenMissingDoctorId_whenGetDoctorAvailability_thenBadRequestAndMissingParamException() throws Exception {
                    request.param("date", VALID_DATE.toString());
                    
                    mockMvc.perform(request)
                        .andExpect(status().isBadRequest())
                        .andExpect(result ->
                            assertThat(result.getResolvedException() instanceof MissingServletRequestParameterException)
                                .isTrue())
                        .andExpect(result ->
                            assertThat(((MissingServletRequestParameterException) result.getResolvedException()).getParameterName())
                                .isEqualTo("doctorId"));
                    
                    verifyNoInteractions(mainService);
                    verifyNoInteractions(doctorService);
                }
                
                @Test
                void givenMissingDate_whenGetDoctorAvailability_thenBadRequestAndMissingParamException() throws Exception {
                    request.param("doctorId", String.valueOf(VALID_DOCTOR_ID));
                    
                    mockMvc.perform(request)
                        .andExpect(status().isBadRequest())
                        .andExpect(result ->
                            assertThat(result.getResolvedException() instanceof MissingServletRequestParameterException)
                                .isTrue())
                        .andExpect(result ->
                            assertThat(((MissingServletRequestParameterException) result.getResolvedException()).getParameterName())
                                .isEqualTo("date"));
                    
                    verifyNoInteractions(mainService);
                    verifyNoInteractions(doctorService);
                }
                
                // Method: getDoctor
                
                // Method: saveDoctor
                
                // Method: doctorLogin
                
                // Method: updateDoctor
                
                // Method: deleteDoctor
                
                // Method: filterDoctors
            }
            
        }
        
        
        @Nested
        @DisplayName("Given invalid credentials")
        class InvalidCredentialsContext {
            
            @BeforeEach
            void setupRequestWithHeaders() throws Exception {
                request = getBaseRequest("/availability", INVALID_USER_NAME, INVALID_AUTH_TOKEN);
            }
            
            @BeforeEach
            void setupStubs() throws Exception {
                when(mainService.validateToken(INVALID_AUTH_TOKEN, INVALID_USER_NAME))
                    .thenReturn(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
            }
            
            @Nested
            @DisplayName("and Given valid parameters")
            class ValidParamsContext {
                
                @BeforeEach
                void addValidParamsToRequest() {
                    request.param("doctorId", String.valueOf(VALID_DOCTOR_ID))
                        .param("date", VALID_DATE.toString());
                }
                
                @Test
                void whenGetDoctorAvailability_thenUnauthorizedAndEmptyBody() throws Exception {
                    mockMvc.perform(request)
                        .andExpect(status().isUnauthorized())
                        .andExpect(content().string(""));
                    
                    verify(mainService).validateToken(INVALID_AUTH_TOKEN, INVALID_USER_NAME);
                    verifyNoInteractions(doctorService);
                }
            }
            
            @Nested
            @DisplayName("and Given invalid parameters")
            class InvalidParamsContext {
            }
            
            @Nested
            @DisplayName("and Given illegal parameters")
            class IllegalParamsContext {
            }
        }
        
        /*
          Contexto de Credenciales Ilegales:
          Valores Existentes, pero Inaceptables (ej: `X-User: ""`, o un token que no sigue el formato JWT).
          - Si tu controlador tiene `@RequestHeader(value = "X-User") String user`, y envías la cabecera vacía,
            Spring la acepta como un String vacío. La "ilegalidad" la determinará tu `MainService` al validar.
          - Ej.: Tokens corruptos, usuarios con caracteres prohibidos. Siempre que tu lógica de validación sea
            capaz de distinguirlos de un simple "Unauthorized".(👎 No en este proyecto, 👍 si para el siguiente)
         */
        @Nested
        @DisplayName("Given illegal credentials")
        class IllegalCredentialsContext {
        
        }
    }
    
    /*
        El responsable es `DoctorServiceV2`.
     */
    @Nested
    class BusinessLogicContext {
    
    }
    /*
        Contexto para Tests Estructurales (diferenciados de los Contextos de Seguridad y Contexto de Reglas de Negocio o Operaciones del Domino de la Aplicación)
        - Contextos como idea inspirada en BDD de Tío Bob, en el que explica los Escenarios para los User Stories (pues algo parecido pero distinto 😅).
     */
    @Nested
    class InfrastructureContext {
        
        
        // TODO: 4. Revisar concepto y nombre. La idea es un contexto específico que pruebe el comportamiento, no del Controlador es sí mismo (unitario)
        //  si no, del componente que añade Spring ¿Web: MVC? para gestionar las peticiones HTTP que enruta hacia este Controlador.
        @Nested
        @DisplayName("Given missing any request headers")
        class MissingRequestHeadersContext {
            
            @BeforeEach
            void setupRequestWithHeaders() throws Exception {
                request = getBaseRequest("/availability", VALID_USER_NAME, VALID_AUTH_TOKEN);
            }
            
            @Nested
            @DisplayName("and Given parameters with any value")
            class anyValueParamsContext {
                
                @BeforeEach
                void addAnyValueParams() {
                    request.param("doctorId", String.valueOf(VALID_DOCTOR_ID))
                        .param("date", VALID_DATE.toString());
                }
            
            /*
                Pruebas de Falta de Cabecera, para cada uno de los Métodos de enrutamiento del Controlador.
                - Somos exhaustivos en las pruebas, NO escatimamos verificaciones de ninguna cabecera ni método.
             */
            
            /*
             🔎 Búsqueda de Patrones conductuales para Óptimización de Código (refactorización).
             - Posible Refactorización por redundancia de verificación idéntica de cabeceras de Credenciales en todos los métodos
               - ⚙️1️⃣ Diseñar método "helper" compartido para todas las funciones (inspiración de getBaseRequest() (by Gemini ✨)).
               - ⚙️2️⃣ Utilizamos el método getBaseRequest() extendido con el método para añadirlo al `request` junto con la nueva funcionalidad para `missings`,
                 que consiste en pasar 'null' para aquellas cabeceras que no queramos añadir a la llamada (los "missings").
                 - Ej.: getBaseRequest("/availability", null, "Sam") -> request = get("v1/doctor/availability").header("X-User", "Sam"); (missig token)
               - ⚙️3️⃣.1️⃣ 💭 Inspirados en el Método: givenManyArgumentsViolatesConstraints_whenRegister_thenThrowsThatManyFieldsConstraintsExceptions
                 del test de `DoctorRepositoryTest`, que utiliza un "helper" para buscar una ConstraintViolationExcepción dentro del conjunto
                 de violaciones que crea Jakarta cuando, verifica si se están cumpliendo las restricciones, en la creación de una Entidad.
                 Jakarta añade al conjunto cada una de las violaciones llevadas a cabo en una sola creación de Entidad.
                    - En caso de que haga lo mismo Spring DispatcherServlet, y agrupe todas las `missing` cabeceras de una sola llamada al Controlador,
                      En algún tipo de Contenedor para Excepciones (e.g. Set<MissingRequestHeaderException>), podemos utilizar un "helper" de búsqueda,
                      para cada una de las 2 cabeceras que faltan en un solo método de test. Sin embargo, si Spring no agrega las Excepciones y tan solo
                      propaga la primera cabecera que provoque una excepción, en tal caso, tendremos que hacer llamdas iterativas a cada método, con un
                      "missing" de cabecera especificio, verifandolas una a una.
               - ⚙️3️⃣.2️⃣ Utilizamos TestParamétricos, con el nombre de la cabecera para reiterar sobre todas ellas en un mismo método.
                 - @ValueSource(strings = {"X-User", "Authorization}) ... (String header)
                    // ...
                 - Inspirados en: getBaseRequest("/availability", null, null)
                   Añadimos otro helper: getEndpointWithMissingHeader("/availability", header) ->
                        header: "X-User" -> request = get("v1/doctor/availability").header("Authorization", token); // sin "X-User" 🤔
                   
                 .andExpect(result ->
                     assertThat(((MissingRequestHeaderException) result.getResolvedException()).getHeaderName())
                        .isEqualTo(header)); // "X-User"
                        
               - ⚙️💡 Extrapolar a Missing Paramters Escenario, me da la sensación de que podremos aplicar el mismo procedimiento. 😀
             
             */
                
                // Missing Headers: getDoctorAvailability
                // - 1️⃣ Credential Headers: X-User, Authorization
                // - 2️⃣ Url: BASE_URL + Url de getDoctorAvailability
                // - 3️⃣ Buscar las excepciones de las cabeceras faltantes.
                
                // Missing Headers: getDoctor
                // - ⚙️1️⃣ Credential Headers: X-User, Authorization
                // - Url: BASE_URL + Url de getDoctorAvailability
                
                // Missing Headers: saveDoctor
                // - ⚙️1️⃣ Credential Headers: X-User, Authorization
                // - Url: BASE_URL + Url de getDoctorAvailability
                
                // Missing Headers: doctorLogin
                // - ⚙️1️⃣ Credential Headers: X-User, Authorization
                // - Url: BASE_URL + Url de getDoctorAvailability
                
                // Missing Headers: updateDoctor
                // - ⚙️1️⃣ Credential Headers: X-User, Authorization
                // - Url: BASE_URL + Url de getDoctorAvailability
                
                // Missing Headers: deleteDoctor
                // - ⚙️1️⃣ Credential Headers: X-User, Authorization
                // - Url: BASE_URL + Url de getDoctorAvailability
                
                // Missing Headers: filterDoctors
                // - ⚙️1️⃣ Credential Headers: X-User, Authorization
                // - Url: BASE_URL + Url de getDoctorAvailability
                
                //
                
                @Test
                @DisplayName("and Given missing Username When any method Then 400 BadRequest and MissingRequestHeaderException")
                void givenMissingUsername_whenAnyMethod_thenBadRequestAndMissingHeaderException() throws Exception {
                    mockMvc.perform(request
                            //.header("X-User", INVALID_USER_NAME)
                            .header("Authorization", VALID_AUTH_TOKEN))
                        .andExpect(status().isBadRequest())
                        .andExpect(result ->
                            assertThat(result.getResolvedException() instanceof MissingRequestHeaderException)
                                .isTrue())
                        .andExpect(result ->
                            assertThat(((MissingRequestHeaderException) result.getResolvedException()).getHeaderName())
                                .isEqualTo("X-User"));
                    
                    verifyNoInteractions(mainService);
                    verifyNoInteractions(doctorService);
                }
                
                @Test
                @DisplayName("When any method Then 400 BadRequest and MissingRequestHeaderException")
                void givenMissingToken_whenAnyMethod_thenBadRequestAndMissingHeaderException() throws Exception {
                    mockMvc.perform(request
                            .header("X-User", VALID_USER_NAME))
                        //.header("Authorization", VALID_AUTH_TOKEN))
                        .andExpect(status().isBadRequest())
                        .andExpect(result ->
                            assertThat(result.getResolvedException() instanceof MissingRequestHeaderException)
                                .isTrue())
                        .andExpect(result ->
                            assertThat(((MissingRequestHeaderException) result.getResolvedException()).getHeaderName())
                                .isEqualTo("Authorization"));
                    
                    verifyNoInteractions(mainService);
                    verifyNoInteractions(doctorService);
                }
                
                @ParameterizedTest
                @ValueSource(strings = {"X-User", "Authorization"})
                void givenAnyMissingHeader_whenGetDoctorAvailability_thenBadRequestAndMissingHeaderException(String header) throws Exception {
                    // `request` configurado en los @BeforeEach con los `setup()` del contexto.
                    
                    // eliminar la cabecera con nombre `header`
                    // removeHeader(String name): Remove already registered entries for the specified HTTP header, if any.
                    // usamos el mismo procedimiento para los Tests Paramétricos de los parámetros.
                    // removeParameter(String name)
                    
                    // quitar la cabecera, aquí me bloqueo 😞
//                    MockHttpServletRequest request2 = request.buildRequest(¿¿Servlet.getContext ? ?);
//                    request.removeHeader(header);
//
//                    mockMvc.perform(request)
//                        .andExpect(status().isBadRequest())
//                        .andExpect(result ->
//                            assertThat(result.getResolvedException() instanceof MissingRequestHeaderException)
//                                .isTrue())
//                        .andExpect(result ->
//                            assertThat(((MissingRequestHeaderException) result.getResolvedException()).getHeaderName())
//                                .isEqualTo(header));
//
//                    verifyNoInteractions(mainService);
//                    verifyNoInteractions(doctorService);
}

            }
        }
        
        class MissingRequestParametersContext {}
        
    }
}
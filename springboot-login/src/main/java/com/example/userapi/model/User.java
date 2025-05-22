package com.example.userapi.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private Integer age;

    private String sex;

    private Long income;

    private String segment;

    @Column(name = "age_grouped")
    private String ageGrouped;

    @Column(name = "income_grouped")
    private String incomeGrouped;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @ElementCollection
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "roles")
    private List<String> roles = new ArrayList<>();

    @Column(name = "fecha_dato")
    private String fechaDato;

    @Column(name = "ind_empleado")
    private String indEmpleado;

    @Column(name = "pais_residencia")
    private String paisResidencia;

    @Column(name = "fecha_alta")
    private String fechaAlta;

    @Column(name = "ind_nuevo")
    private Integer indNuevo;

    @Column(name = "antiguedad")
    private Integer antiguedad;

    @Column(name = "indrel")
    private String indrel;

    @Column(name = "ult_fec_cli_1t")
    private String ultFecCli1t;

    @Column(name = "indrel_1mes")
    private String indrel1mes;

    @Column(name = "tiprel_1mes")
    private String tiprel1mes;

    @Column(name = "indresi")
    private String indresi;

    @Column(name = "indext")
    private String indext;

    @Column(name = "conyuemp")
    private String conyuemp;

    @Column(name = "canal_entrada")
    private String canalEntrada;

    @Column(name = "indfall")
    private String indfall;

    @Column(name = "tipodom")
    private String tipodom;

    @Column(name = "cod_prov")
    private String codProv;

    @Column(name = "nomprov")
    private String nomprov;

    @Column(name = "ind_actividad_cliente")
    private Integer indActividadCliente;

    @Column(name = "renta")
    private Double renta;

    @Column(name = "sexo")
    private String sexo;

    @Column(name = "segmento")
    private String segmento;

    @Column(name = "ind_ahor_fin_ult1")
    private Integer indAhorFinUlt1;

    @Column(name = "ind_aval_fin_ult1")
    private Integer indAvalFinUlt1;

    @Column(name = "ind_cco_fin_ult1")
    private Integer indCcoFinUlt1;

    @Column(name = "ind_cder_fin_ult1")
    private Integer indCderFinUlt1;

    @Column(name = "ind_cno_fin_ult1")
    private Integer indCnoFinUlt1;

    @Column(name = "ind_ctju_fin_ult1")
    private Integer indCtjuFinUlt1;

    @Column(name = "ind_ctma_fin_ult1")
    private Integer indCtmaFinUlt1;

    @Column(name = "ind_ctop_fin_ult1")
    private Integer indCtopFinUlt1;

    @Column(name = "ind_ctpp_fin_ult1")
    private Integer indCtppFinUlt1;

    @Column(name = "ind_deco_fin_ult1")
    private Integer indDecoFinUlt1;

    @Column(name = "ind_deme_fin_ult1")
    private Integer indDemeFinUlt1;

    @Column(name = "ind_dela_fin_ult1")
    private Integer indDelaFinUlt1;

    @Column(name = "ind_ecue_fin_ult1")
    private Integer indEcueFinUlt1;

    @Column(name = "ind_fond_fin_ult1")
    private Integer indFondFinUlt1;

    @Column(name = "ind_hip_fin_ult1")
    private Integer indHipFinUlt1;

    @Column(name = "ind_plan_fin_ult1")
    private Integer indPlanFinUlt1;

    @Column(name = "ind_pres_fin_ult1")
    private Integer indPresFinUlt1;

    @Column(name = "ind_reca_fin_ult1")
    private Integer indRecaFinUlt1;

    @Column(name = "ind_tjcr_fin_ult1")
    private Integer indTjcrFinUlt1;

    @Column(name = "ind_valo_fin_ult1")
    private Integer indValoFinUlt1;

    @Column(name = "ind_viv_fin_ult1")
    private Integer indVivFinUlt1;

    @Column(name = "ind_nomina_ult1")
    private Integer indNominaUlt1;

    @Column(name = "ind_nom_pens_ult1")
    private Integer indNomPensUlt1;

    @Column(name = "ind_recibo_ult1")
    private Integer indReciboUlt1;

    @ManyToMany
    @JoinTable(
            name = "customer_products",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    @JsonManagedReference
    private List<Product> products = new ArrayList<>();

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.createdAt = LocalDateTime.now();
    }
}
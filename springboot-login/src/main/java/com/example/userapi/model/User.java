package com.example.userapi.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
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
    private List<Product> products = new ArrayList<>();

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public String getSex() { return sex; }
    public void setSex(String sex) { this.sex = sex; }
    public Long getIncome() { return income; }
    public void setIncome(Long income) { this.income = income; }
    public String getSegment() { return segment; }
    public void setSegment(String segment) { this.segment = segment; }
    public String getAgeGrouped() { return ageGrouped; }
    public void setAgeGrouped(String ageGrouped) { this.ageGrouped = ageGrouped; }
    public String getIncomeGrouped() { return incomeGrouped; }
    public void setIncomeGrouped(String incomeGrouped) { this.incomeGrouped = incomeGrouped; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getLastLogin() { return lastLogin; }
    public void setLastLogin(LocalDateTime lastLogin) { this.lastLogin = lastLogin; }
    public List<String> getRoles() { return roles; }
    public void setRoles(List<String> roles) { this.roles = roles; }
    public List<Product> getProducts() { return products; }
    public void setProducts(List<Product> products) { this.products = products; }
    public String getFechaDato() { return fechaDato; }
    public void setFechaDato(String fechaDato) { this.fechaDato = fechaDato; }
    public String getIndEmpleado() { return indEmpleado; }
    public void setIndEmpleado(String indEmpleado) { this.indEmpleado = indEmpleado; }
    public String getPaisResidencia() { return paisResidencia; }
    public void setPaisResidencia(String paisResidencia) { this.paisResidencia = paisResidencia; }
    public String getFechaAlta() { return fechaAlta; }
    public void setFechaAlta(String fechaAlta) { this.fechaAlta = fechaAlta; }
    public Integer getIndNuevo() { return indNuevo; }
    public void setIndNuevo(Integer indNuevo) { this.indNuevo = indNuevo; }
    public Integer getAntiguedad() { return antiguedad; }
    public void setAntiguedad(Integer antiguedad) { this.antiguedad = antiguedad; }
    public String getIndrel() { return indrel; }
    public void setIndrel(String indrel) { this.indrel = indrel; }
    public String getUltFecCli1t() { return ultFecCli1t; }
    public void setUltFecCli1t(String ultFecCli1t) { this.ultFecCli1t = ultFecCli1t; }
    public String getIndrel1mes() { return indrel1mes; }
    public void setIndrel1mes(String indrel1mes) { this.indrel1mes = indrel1mes; }
    public String getTiprel1mes() { return tiprel1mes; }
    public void setTiprel1mes(String tiprel1mes) { this.tiprel1mes = tiprel1mes; }
    public String getIndresi() { return indresi; }
    public void setIndresi(String indresi) { this.indresi = indresi; }
    public String getIndext() { return indext; }
    public void setIndext(String indext) { this.indext = indext; }
    public String getConyuemp() { return conyuemp; }
    public void setConyuemp(String conyuemp) { this.conyuemp = conyuemp; }
    public String getCanalEntrada() { return canalEntrada; }
    public void setCanalEntrada(String canalEntrada) { this.canalEntrada = canalEntrada; }
    public String getIndfall() { return indfall; }
    public void setIndfall(String indfall) { this.indfall = indfall; }
    public String getTipodom() { return tipodom; }
    public void setTipodom(String tipodom) { this.tipodom = tipodom; }
    public String getCodProv() { return codProv; }
    public void setCodProv(String codProv) { this.codProv = codProv; }
    public String getNomprov() { return nomprov; }
    public void setNomprov(String nomprov) { this.nomprov = nomprov; }
    public Integer getIndActividadCliente() { return indActividadCliente; }
    public void setIndActividadCliente(Integer indActividadCliente) { this.indActividadCliente = indActividadCliente; }
    public Double getRenta() { return renta; }
    public void setRenta(Double renta) { this.renta = renta; }
    public String getSexo() { return sexo; }
    public void setSexo(String sexo) { this.sexo = sexo; }
    public String getSegmento() { return segmento; }
    public void setSegmento(String segmento) { this.segmento = segmento; }
    public Integer getIndAhorFinUlt1() { return indAhorFinUlt1; }
    public void setIndAhorFinUlt1(Integer indAhorFinUlt1) { this.indAhorFinUlt1 = indAhorFinUlt1; }
    public Integer getIndAvalFinUlt1() { return indAvalFinUlt1; }
    public void setIndAvalFinUlt1(Integer indAvalFinUlt1) { this.indAvalFinUlt1 = indAvalFinUlt1; }
    public Integer getIndCcoFinUlt1() { return indCcoFinUlt1; }
    public void setIndCcoFinUlt1(Integer indCcoFinUlt1) { this.indCcoFinUlt1 = indCcoFinUlt1; }
    public Integer getIndCderFinUlt1() { return indCderFinUlt1; }
    public void setIndCderFinUlt1(Integer indCderFinUlt1) { this.indCderFinUlt1 = indCderFinUlt1; }
    public Integer getIndCnoFinUlt1() { return indCnoFinUlt1; }
    public void setIndCnoFinUlt1(Integer indCnoFinUlt1) { this.indCnoFinUlt1 = indCnoFinUlt1; }
    public Integer getIndCtjuFinUlt1() { return indCtjuFinUlt1; }
    public void setIndCtjuFinUlt1(Integer indCtjuFinUlt1) { this.indCtjuFinUlt1 = indCtjuFinUlt1; }
    public Integer getIndCtmaFinUlt1() { return indCtmaFinUlt1; }
    public void setIndCtmaFinUlt1(Integer indCtmaFinUlt1) { this.indCtmaFinUlt1 = indCtmaFinUlt1; }
    public Integer getIndCtopFinUlt1() { return indCtopFinUlt1; }
    public void setIndCtopFinUlt1(Integer indCtopFinUlt1) { this.indCtopFinUlt1 = indCtopFinUlt1; }
    public Integer getIndCtppFinUlt1() { return indCtppFinUlt1; }
    public void setIndCtppFinUlt1(Integer indCtppFinUlt1) { this.indCtppFinUlt1 = indCtppFinUlt1; }
    public Integer getIndDecoFinUlt1() { return indDecoFinUlt1; }
    public void setIndDecoFinUlt1(Integer indDecoFinUlt1) { this.indDecoFinUlt1 = indDecoFinUlt1; }
    public Integer getIndDemeFinUlt1() { return indDemeFinUlt1; }
    public void setIndDemeFinUlt1(Integer indDemeFinUlt1) { this.indDemeFinUlt1 = indDemeFinUlt1; }
    public Integer getIndDelaFinUlt1() { return indDelaFinUlt1; }
    public void setIndDelaFinUlt1(Integer indDelaFinUlt1) { this.indDelaFinUlt1 = indDelaFinUlt1; }
    public Integer getIndEcueFinUlt1() { return indEcueFinUlt1; }
    public void setIndEcueFinUlt1(Integer indEcueFinUlt1) { this.indEcueFinUlt1 = indEcueFinUlt1; }
    public Integer getIndFondFinUlt1() { return indFondFinUlt1; }
    public void setIndFondFinUlt1(Integer indFondFinUlt1) { this.indFondFinUlt1 = indFondFinUlt1; }
    public Integer getIndHipFinUlt1() { return indHipFinUlt1; }
    public void setIndHipFinUlt1(Integer indHipFinUlt1) { this.indHipFinUlt1 = indHipFinUlt1; }
    public Integer getIndPlanFinUlt1() { return indPlanFinUlt1; }
    public void setIndPlanFinUlt1(Integer indPlanFinUlt1) { this.indPlanFinUlt1 = indPlanFinUlt1; }
    public Integer getIndPresFinUlt1() { return indPresFinUlt1; }
    public void setIndPresFinUlt1(Integer indPresFinUlt1) { this.indPresFinUlt1 = indPresFinUlt1; }
    public Integer getIndRecaFinUlt1() { return indRecaFinUlt1; }
    public void setIndRecaFinUlt1(Integer indRecaFinUlt1) { this.indRecaFinUlt1 = indRecaFinUlt1; }
    public Integer getIndTjcrFinUlt1() { return indTjcrFinUlt1; }
    public void setIndTjcrFinUlt1(Integer indTjcrFinUlt1) { this.indTjcrFinUlt1 = indTjcrFinUlt1; }
    public Integer getIndValoFinUlt1() { return indValoFinUlt1; }
    public void setIndValoFinUlt1(Integer indValoFinUlt1) { this.indValoFinUlt1 = indValoFinUlt1; }
    public Integer getIndVivFinUlt1() { return indVivFinUlt1; }
    public void setIndVivFinUlt1(Integer indVivFinUlt1) { this.indVivFinUlt1 = indVivFinUlt1; }
    public Integer getIndNominaUlt1() { return indNominaUlt1; }
    public void setIndNominaUlt1(Integer indNominaUlt1) { this.indNominaUlt1 = indNominaUlt1; }
    public Integer getIndNomPensUlt1() { return indNomPensUlt1; }
    public void setIndNomPensUlt1(Integer indNomPensUlt1) { this.indNomPensUlt1 = indNomPensUlt1; }
    public Integer getIndReciboUlt1() { return indReciboUlt1; }
    public void setIndReciboUlt1(Integer indReciboUlt1) { this.indReciboUlt1 = indReciboUlt1; }
}